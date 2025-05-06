<template>
  <div class="cart-container">
    <h1>Cart</h1>

    <div class="cart-main">
      <table class="cart-table" v-if="cartItems.length">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <!-- <th>Quantity</th> -->
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.book_id">
            <td class="product-info">
              <img :src="item.image" alt="Book Cover" />
              <div class="product-text">
                <span>{{ item.title }}</span>
              </div>
            </td>
            <td>${{ parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
            <td>${{ parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="cart-totals-inline" v-if="cartItems.length">
        <h3>Cart totals</h3>
        <div class="totals">
          <div><span>Subtotal</span><span>$ {{ totalprice }}</span></div>
          <div><span>Total</span><span>$ {{ totalprice }}</span></div>
        </div>
        <button class="checkout" @click="checkout">Proceed to checkout</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
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

const totalprice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + parseFloat(item.price), 0).toLocaleString(undefined, { minimumFractionDigits: 2 });
});

const checkout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const response = await axios.post("http://localhost:3000/checkout", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Checkout Response:", response.data);
    alert(response.data.message);

    // Refresh cart after checkout to reflect changes
    fetchCart();
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Failed to complete checkout.");
  }
};

// Fetch cart when component is mounted
onMounted(fetchCart);
</script>



<style scoped>
.cart-container {
  /* max-width: 1000px; */
  margin: auto;
  margin-bottom: 10%;
  font-family: 'Times New Roman', Times, serif;
  color: #000;
}


h1 {
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.cart-main {
  display: flex;
  gap: 80px;
  /* or even 100px */
  align-items: flex-start;

}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  gap: 50px;
}

.cart-table th,
.cart-table td {
  text-align: left;
  padding: 25px 35px 10px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-info img {
  width: 70px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.product-text span {
  display: block;
  font-size: 16px;
}

input[type="number"] {
  width: 50px;
  padding: 6px;
  font-size: 14px;
  text-align: center;
}

.cart-totals-inline {
  background-color: #fafafa;
  border: 1px solid #eee;
  padding: 15px;
  font-size: 14px;
  min-width: 250px;
}

.cart-totals-inline h3 {
  margin-top: 0;
  font-size: 26px;
  margin-bottom: 12px;
}

.cart-totals-inline {
  flex-shrink: 0;
  min-width: 240px;
  max-width: 290px;
}

.cart-totals-inline .totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  margin-bottom: 12px;
}

.cart-totals-inline .totals div {
  display: flex;
  justify-content: space-between;
}

.cart-totals-inline .checkout {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}

.cart-totals-inline .checkout:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .cart-main {
    flex-direction: column;
    gap: 60px;
  }

  .cart-totals-inline {
    align-self: flex-start;
  }
}
</style>
