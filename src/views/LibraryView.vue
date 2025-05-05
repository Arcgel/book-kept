<template>
    <div>
      <div v-for="(section, index) in bookSections" :key="index" class="container-section">
        <div class="section-title">{{ section.title }}</div>
        <div class="container">
          <div class="book-grid">
            <div v-for="book in section.books" :key="book.book_id" class="book-card">
              <div class="book-cover">
                <img :src="book.image" :alt="book.title" class="img-fluid rounded" />
              </div>
              <div class="book-title">{{ book.title }}</div>
              <div class="book-price">${{ book.price }}</div>
              <div class="book-author">{{ book.author }}</div>
              <div class="book-category">{{ book.category }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const bookSections = [
    {
      title: "Best Seller",
      books: [
        {
          book_id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          category: "Classic",
          price: 20,
          image: "/src/assets/images/blair.jpg"
        },
        {
          book_id: 2,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          category: "Fiction",
          price: 18,
          image: "/src/assets/images/cupid.jpg"
        },
        {
          book_id: 3,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          category: "Romance",
          price: 22,
          image: "/src/assets/images/isabelle.jpg"
        },
        {
          book_id: 4,
          title: "Moby Dick",
          author: "Herman Melville",
          category: "Adventure",
          price: 19,
          image: "/src/assets/images/robert.jpg"
        },
        {
          book_id: 5,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          category: "Fantasy",
          price: 25,
          image: "/src/assets/images/romance.jpg"
        },
        {
          book_id: 6,
          title: "Crime and Punishment",
          author: "Fyodor Dostoevsky",
          category: "Philosophical",
          price: 21,
          image: "/src/assets/images/mystery.jpg"
        }
      ]
    },
    {
      title: "New Releases",
      books: [
        {
          book_id: 7,
          title: "Project Hail Mary",
          author: "Andy Weir",
          category: "Sci-Fi",
          price: 23,
          image: "/src/assets/images/cupid.jpg"
        },
        {
          book_id: 8,
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          category: "Dystopian",
          price: 19,
          image: "/src/assets/images/mystery.jpg"
        },
        {
          book_id: 9,
          title: "The Midnight Library",
          author: "Matt Haig",
          category: "Fantasy",
          price: 20,
          image: "/src/assets/images/blair.jpg"
        },
        {
          book_id: 10,
          title: "The Paper Palace",
          author: "Miranda Cowley Heller",
          category: "Drama",
          price: 17,
          image: "/src/assets/images/robert.jpg"
        },
        {
          book_id: 11,
          title: "Apples Never Fall",
          author: "Liane Moriarty",
          category: "Mystery",
          price: 24,
          image: "/src/assets/images/romance.jpg"
        },
        {
          book_id: 12,
          title: "Beautiful World, Where Are You",
          author: "Sally Rooney",
          category: "Literary",
          price: 22,
          image: "/src/assets/images/H.J.jpg"
        }
      ]
    },
    {
      title: "New & Trending",
      books: [
        {
          book_id: 13,
          title: "1984",
          author: "George Orwell",
          category: "Dystopian",
          price: 18,
          image: "/src/assets/images/isabelle.jpg"
        },
        {
          book_id: 14,
          title: "The Little Prince",
          author: "Antoine de Saint-Exupéry",
          category: "Fantasy",
          price: 15,
          image: "/src/assets/images/cupid.jpg"
        },
        {
          book_id: 15,
          title: "The Alchemist",
          author: "Paulo Coelho",
          category: "Philosophical",
          price: 16,
          image: "/src/assets/images/H.J.jpg"
        },
        {
          book_id: 16,
          title: "Brave New World",
          author: "Aldous Huxley",
          category: "Sci-Fi",
          price: 20,
          image: "/src/assets/images/robert.jpg"
        },
        {
          book_id: 17,
          title: "Dune",
          author: "Frank Herbert",
          category: "Sci-Fi",
          price: 28,
          image: "/src/assets/images/lara.jpg"
        },
        {
          book_id: 18,
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          category: "Classic",
          price: 19,
          image: "/src/assets/images/mystery.jpg"
        }
      ]
    }
  ];
  </script>
  
  
  <style scoped>
  body {
    background: #f8f0f0;
    font-family: 'Times New Roman', Times, serif;
  }
  
  .section-title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: -3rem;
    margin-left: 0;
  }
  
  .book-cover {
    width: 100%;
    height: 200px;
    background-color: #eaeaea;
    border-radius: 6px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .book-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .book-grid {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
  }
  
  .book-card {
    background-color: #fff;
    width: 180px;
    padding: 17px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
  }
  
  .book-card:hover {
    transform: translateY(-5px);
  }
  
  .book-title {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }
  
  .book-author,
  .book-category {
    font-size: 12px;
    color: #555;
    text-align: center;
  }
  
  .book-price {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-top: 5px;
  }
  
  .container-section {
    margin-bottom: 40px;
  }
  
  .container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 5px;
  }
  </style>
  