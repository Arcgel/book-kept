<template>
  <div class="container my-5 p-4">
    <div class="col-md-12 mb-3">
      <div class="card">
        <div class="d-flex justify-content-between mb-3">
          <h5>My Published Books</h5>
          <button class="btn btn-primary btn-sm" @click="showAddBookModal">+ Add New Book</button>
        </div>

        <div class="table-responsive">
          <table class="table table-borderless align-middle">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book</th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.book_id">
                <td>{{ book.book_id }}</td>
                <td>
                  <img :src="book.image" alt="Book Cover" class="img-thumbnail" style="width: 40px; height: 60px;" />
                </td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.description }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-1"><i class="bi bi-pencil-square"></i></button>
                  <button class="btn btn-sm btn-danger" @click="deleteBook(book.book_id)"><i
                      class="bi bi-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ✅ Correctly Pass Modal Visibility & Event Handling -->
        <AddBooksModal :showModal="showModal" @closeModal="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AddBooksModal from '@/components/AddBooksModal.vue';

const books = ref([]);
const showModal = ref(false);

const fetchSellerBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await axios.get("http://localhost:3000/seller-books", {
      headers: { Authorization: `Bearer ${token}` }
    });

    books.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching seller books:", error);
    alert("Failed to load books.");
  }
};

const showAddBookModal = () => {
  showModal.value = true;
};

onMounted(fetchSellerBooks);
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
