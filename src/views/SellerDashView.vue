<template>
    <div class="container my-5 p-4">
      <div class="col-md-12 mb-3">
        <div class="card ">
          <div class="d-flex justify-content-between mb-3">
            <h5>Books List</h5>
            <button class="btn btn-primary btn-sm" @click="addBook">+ Add New Book</button>
          </div>
          <div class="table-responsive">
            <table class="table table-borderless align-middle">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Book</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in books" :key="book.id">
                  <td>{{ book.id }}</td>
                  <td>
                    <img :src="book.cover" alt="Book Cover" class="img-thumbnail" style="width: 40px; height: 60px;" />
                  </td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>
                    <button class="btn btn-sm btn-warning me-1"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BookList",
    data() {
      return {
        books: [
          {
            id: "#001",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            cover: "/src/assets/images/mystery.jpg",
          },
          {
            id: "#002",
            title: "1984",
            author: "George Orwell",
            cover: "/src/assets/images/mystery.jpg",
          },
        ],
      };
    },
  
  };
  </script>
  
  <style scoped>
  body {
    background: #faf7f7;
    font-family: 'Times New Roman', Times, serif;
  }
  
  .card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 20px;
    width: 250%;        
    margin-bottom: 400px;
    margin-left: -200px; 
  }
  
  .table th,
  .table td {
    vertical-align: middle;
    font-family: 'Times New Roman', Times, serif;
  }
  
  h5 {
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
  }
  </style>
  