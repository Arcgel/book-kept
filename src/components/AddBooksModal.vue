<template>
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click="$emit('closeModal')">
      <div class="modal-content" @click.stop>
        <h5>Add New Book</h5>
        <input v-model="newBook.title" placeholder="Title" class="form-control mb-2" />
        <input v-model="newBook.author" placeholder="Author" class="form-control mb-2" />
        <input v-model="newBook.description" placeholder="Description" class="form-control mb-2" />
        <input v-model="newBook.category" placeholder="Category" class="form-control mb-2" />
        <input v-model="newBook.price" placeholder="Price" type="number" class="form-control mb-2" />
        <input v-model="newBook.image" placeholder="Image URL" class="form-control mb-2" />
        <button class="btn btn-success btn-sm" @click="addBook">Add Book</button>
        <button class="btn btn-secondary btn-sm" @click="$emit('closeModal')">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';

defineProps({
  showModal: Boolean
});

const emit = defineEmits(["closeModal"]);

const newBook = ref({
  title: "",
  author: "",
  description: "",
  category: "",
  price: "",
  image: "",
});

const addBook = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/books", { ...newBook.value, sellerid: token }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    emit('closeModal');
    alert("Book added successfully!");
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Failed to add book.");
  }
};
</script>

<style scoped>
.modal-overlay {
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}
</style>
