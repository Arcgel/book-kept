<template>
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click="$emit('closeModal')">
      <div class="modal-content" @click.stop>
        <h5>Edit Book</h5>
        <input v-model="editBook.title" placeholder="Title" class="form-control mb-2" />
        <input v-model="editBook.author" placeholder="Author" class="form-control mb-2" />
        <textarea v-model="editBook.book_description" placeholder="Description" class="form-control mb-2" />
        <input v-model="editBook.category" placeholder="Category" class="form-control mb-2" />
        <input v-model="editBook.price" placeholder="Price" type="number" class="form-control mb-2" />
        <input v-model="editBook.image" placeholder="Image URL" class="form-control mb-2" />
        <button class="btn btn-success btn-sm" @click="updateBook">Update Book</button>
        <button class="btn btn-secondary btn-sm" @click="$emit('closeModal')">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  showModal: Boolean,
  bookToEdit: Object
});

const emit = defineEmits(["closeModal"]);

const editBook = ref({});

// Watch for changes in `bookToEdit` and update `editBook`
watch(() => props.bookToEdit, (newBook) => {
  editBook.value = { ...newBook };
}, { immediate: true });

const updateBook = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/books/${editBook.value.book_id}`, editBook.value, {
      headers: { Authorization: `Bearer ${token}` }
    });

    emit('closeModal');
    alert("Book updated successfully!");
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Failed to update book.");
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
