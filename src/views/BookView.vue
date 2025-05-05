<template>
  <div class="book-view">
    <h2>{{ book.title }}</h2>
    <img :src="book.image" alt="Book Image" />
    <p>Category: {{ book.category }}</p>
    <p>Author: {{ book.Author }}</p>
    <p>Price: ${{ book.price }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const book = ref(JSON.parse(route.params.bookData)); // Extract book data
</script>
