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
    req.user = user
    next()
  })
}

// User registration
app.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
      // Get the highest sellerid and increment
      db.query('SELECT MAX(sellerid) AS lastSellerId FROM users', async (err, result) => {
          if (err) return res.status(500).json({ message: 'Error fetching last seller ID', error: err.message });

          const lastSellerId = result[0].lastSellerId || 0; // Default to 0 if no records exist
          const newSellerId = lastSellerId + 1; // Increment the last seller ID

          const hashedPassword = await bcrypt.hash(password, 10);
          const query = 'INSERT INTO users (sellerid, name, email, password, phone) VALUES (?, ?, ?, ?, ?)';

          db.query(query, [newSellerId, name, email, hashedPassword, phone], (err) => {
              if (err) return res.status(500).json({ message: 'Error registering user', error: err.message });

              res.status(201).json({ message: 'User registered successfully', sellerid: newSellerId });
          });
      });

  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

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

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret_key', {
      expiresIn: '1h',
    })
    res.status(200).json({ token })
  })
})

app.get('/user-details', authenticateToken, (req, res) => {
  const userId = req.user.id
  const query = 'SELECT firstname, lastname, email, password, is_verified FROM users WHERE id = ?'

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err)
      return res.status(500).send('Error fetching user details')
    }

    if (results.length === 0) {
      return res.status(404).send('User not found')
    }

    const user = results[0]
    res.status(200).json(user)
  })
})

// Update user details
app.post('/update-user', authenticateToken, (req, res) => {
  const { field, value } = req.body
  const userId = req.user.id
  const allowedFields = ['firstname', 'lastname', 'email', 'password']

  if (!allowedFields.includes(field)) {
    return res.status(400).send('Invalid field')
  }

  let query = ''
  const values = [value, userId]

  if (field === 'password') {
    bcrypt.hash(value, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err)
        return res.status(500).send('Error updating password')
      }

      query = 'UPDATE users SET password = ? WHERE id = ?'
      values[0] = hashedPassword
      db.query(query, values, (err) => {
        if (err) {
          console.error(`Error updating ${field}:`, err)
          return res.status(500).send(`Error updating ${field}`)
        }
        res.status(200).send(`${field} updated successfully`)
      })
    })
  } else {
    query = `UPDATE users SET ${field} = ? WHERE id = ?`
    db.query(query, values, (err) => {
      if (err) {
        console.error(`Error updating ${field}:`, err)
        return res.status(500).send(`Error updating ${field}`)
      }
      res.status(200).send(`${field} updated successfully`)
    })
  }
})

// Verify token
app.get('/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({ userId: req.user.id })
})

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error Fetching Books:', err);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results); // Send the books data as JSON response
  });
});
