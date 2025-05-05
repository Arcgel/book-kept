<template>
  <div v-for="item in cartItems" :key="item.book_id" class="cart-item">
    <div class="cart-item-details">
      <h3>{{ item.title }}</h3>
      <p>Author: {{ item.author }}</p>
      <p>Price: ${{ item.price }}</p>
      <img :src="item.image" alt="Book Cover" width="100" />
    </div>
    <!-- <button @click="removeFromCart(item.book_id)">Remove</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cartItems = ref([]);

const fetchCart = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    const response = await axios.get('http://localhost:3000/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Cart Response:", response.data); // Debugging response
    cartItems.value = Array.isArray(response.data) ? response.data : []; // Ensure response is an array
  } catch (error) {
    console.error('Error fetching cart:', error);
    alert('Failed to fetch cart items.');
  }
};

// Fetch cart when component is mounted
onMounted(fetchCart);
</script>
