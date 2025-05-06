import express from 'express'
import mysql from 'mysql2'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookkeeping',
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL database')
})

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('Token required')

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) return res.status(403).send('Invalid token')

    console.log('Decoded Token:', user) // Log entire user object
    console.log('Extracted User ID:', user.id) // Log the expected user ID

    req.user = user
    next()
  })
}

// User registration
app.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body

  try {
    // Get the highest sellerid and increment
    db.query('SELECT MAX(sellerid) AS lastSellerId FROM users', async (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Error fetching last seller ID', error: err.message })

      const lastSellerId = result[0].lastSellerId || 0 // Default to 0 if no records exist
      const newSellerId = lastSellerId + 1 // Increment the last seller ID

      const hashedPassword = await bcrypt.hash(password, 10)
      const query =
        'INSERT INTO users (sellerid, name, email, password, phone) VALUES (?, ?, ?, ?, ?)'

      db.query(query, [newSellerId, name, email, hashedPassword, phone], (err) => {
        if (err)
          return res.status(500).json({ message: 'Error registering user', error: err.message })

        res.status(201).json({ message: 'User registered successfully', sellerid: newSellerId })
      })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body
  const query = 'SELECT * FROM users WHERE email = ?'

  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching user')
    }
    if (results.length === 0) {
      return res.status(401).send('User not found')
    }

    const user = results[0]
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).send('Invalid password')
    }

    const token = jwt.sign({ id: user.userid, email: user.email }, 'your_jwt_secret_key', {
      expiresIn: '1h',
    })
    res.status(200).json({ token })
  })
})

app.post('/add-to-cart', authenticateToken, (req, res) => {
  const userId = req.user.id // Extract user ID from JWT
  const { book_id } = req.body

  if (!book_id) {
    return res.status(400).json({ message: 'Book ID is required' })
  }

  // Check if the book is already in the cart
  const query = 'SELECT * FROM cart WHERE user_id = ? AND book_id = ?'
  db.query(query, [userId, book_id], (err, results) => {
    if (err) {
      console.error('Error checking cart:', err)
      return res.status(500).json({ message: 'Server error' })
    }

    if (results.length > 0) {
      return res.status(200).json({ message: 'Book already in cart' })
    } else {
      // Insert new item into the cart
      const insertQuery = 'INSERT INTO cart (user_id, book_id) VALUES (?, ?)'
      db.query(insertQuery, [userId, book_id], (err) => {
        if (err) {
          console.error('Error adding to cart:', err)
          return res.status(500).json({ message: 'Error adding to cart' })
        }
        return res.status(201).json({ message: 'Book added to cart successfully' })
      })
    }
  })
})

app.get('/cart', authenticateToken, (req, res) => {
  const userId = req.user.id // Extract user ID from JWT

  console.log('Fetching cart for user ID:', userId) // Debugging

  const query = `
    SELECT books.book_id, books.title, books.author, books.price, books.image
    FROM cart
    JOIN books ON cart.book_id = books.book_id
    WHERE cart.user_id = ?;
  `

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err)
      return res.status(500).json({ message: 'Error fetching cart' })
    }

    res.status(200).json(results)
  })
})

// Verify token
app.get('/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({ userId: req.user.id })
})

//Fetch Books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error Fetching Books:', err)
      res.status(500).send('Server Error')
      return
    }
    res.json(results) // Send the books data as JSON response
  })
})

app.post('/checkout', authenticateToken, (req, res) => {
  const userId = req.user.id

  // Fetch items from the cart
  const fetchCartQuery = `SELECT book_id FROM cart WHERE user_id = ?`
  db.query(fetchCartQuery, [userId], (err, cartItems) => {
    if (err) {
      console.error('Error fetching cart:', err)
      return res.status(500).json({ message: 'Server error while fetching cart' })
    }

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const bookIds = cartItems.map((item) => item.book_id)

    // Check if user already owns any of these books
    const checkLibraryQuery = `SELECT book_id FROM library WHERE user_id = ? AND book_id IN (?)`
    db.query(checkLibraryQuery, [userId, bookIds], (err, ownedBooks) => {
      if (err) {
        console.error('Error checking library:', err)
        return res.status(500).json({ message: 'Server error while checking library' })
      }

      const ownedBookIds = ownedBooks.map((book) => book.book_id)
      const booksToPurchase = bookIds.filter((id) => !ownedBookIds.includes(id))

      if (booksToPurchase.length === 0) {
        return res.status(400).json({ message: 'You already own all books in the cart!' })
      }

      // Add books to user's library
      const addToLibraryQuery = `INSERT INTO library (user_id, book_id) VALUES ?`
      const libraryValues = booksToPurchase.map((id) => [userId, id])

      db.query(addToLibraryQuery, [libraryValues], (err) => {
        if (err) {
          console.error('Error adding to library:', err)
          return res.status(500).json({ message: 'Error adding books to library' })
        }

        // Remove items from cart
        const removeCartQuery = `DELETE FROM cart WHERE user_id = ? AND book_id IN (?)`
        db.query(removeCartQuery, [userId, booksToPurchase], (err) => {
          if (err) {
            console.error('Error removing from cart:', err)
            return res.status(500).json({ message: 'Error removing items from cart' })
          }

          // Increase sold count in books table
          const updateSoldQuery = `UPDATE books SET Sales = Sales + 1 WHERE book_id IN (?)`
          db.query(updateSoldQuery, [booksToPurchase], (err) => {
            if (err) {
              console.error('Error updating sold count:', err)
              return res.status(500).json({ message: 'Error updating book sales count' })
            }

            res.status(200).json({ message: 'Checkout successful!' })
          })
        })
      })
    })
  })
})

app.get('/library', authenticateToken, (req, res) => {
  const userId = req.user.id

  const query = `
    SELECT books.book_id, books.title, books.author, books.category, books.price, books.image
    FROM library
    JOIN books ON library.book_id = books.book_id
    WHERE library.user_id = ?;
  `

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching library:', err)
      return res.status(500).json({ message: 'Error fetching library' })
    }

    res.status(200).json(results)
  })
})
