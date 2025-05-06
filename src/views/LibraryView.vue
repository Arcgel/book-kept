<template>
  <div>
    <div class="section-title">Your Library</div>
    <div class="container">
      <div class="book-grid">
        <div v-for="book in libraryBooks" :key="book.book_id" class="book-card">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const libraryBooks = ref([]); // Store the user's library books

const fetchLibrary = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await axios.get("http://localhost:3000/library", {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Library Response:", response.data);
    libraryBooks.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching library:", error);
    alert("Failed to fetch library.");
  }
};

// Fetch the user's library when the component is mounted
onMounted(fetchLibrary);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
