<template>
  <div class="product-page">
    <div class="left-panel">
      <div class="image-area">
        <img :src="book.image" :alt="book.title" />
      </div>
    </div>

    <div class="right-panel">
      <h2 class="product-title">{{ book.title }}</h2>
      <p class="price">${{ book.price }}</p>
      <p class="product-desc">by {{ book.author }}</p>

      <div class="quantity-cart">
        <button class="add-to-cart" @click="addToCart">Add to cart</button>
        <button class="icon-btn" :class="{ wishlisted: isWishlisted }" @click="toggleWishlist">
          <i class="fas fa-heart"></i>
        </button>
      </div>

      <div class="tabs">
        <button class="tab active">Summary</button>
        <button class="tab">Meta Information</button>
        <button class="tab">Reviews (0)</button>
      </div>

      <div class="tab-content">
        <p>
          {{ book.book_description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();
const book = ref(JSON.parse(route.params.bookData));
const isWishlisted = ref(false);

// 📌 Check if the book is wishlisted
const checkWishlist = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/wishlist/${book.value.book_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    isWishlisted.value = response.data.isWishlisted;
  } catch (error) {
    console.error("Error checking wishlist:", error);
  }
};

// 📌 Toggle wishlist status
const toggleWishlist = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/wishlist",
      { book_id: book.value.book_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    isWishlisted.value = !isWishlisted.value;
  } catch (error) {
    console.error("Error toggling wishlist:", error);
  }
};

const addToCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/add-to-cart",
      { book_id: book.value.book_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(response.data.message);
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add book to cart.");
  }
};

onMounted(checkWishlist);
</script>


<style scoped>
body {
  background: #fff;
  color: #333;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
}

.product-page {
  display: flex;
  min-height: 100vh;
}

.product-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}


.left-panel {
  width: 24%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-content {
  text-align: justify;

}


.image-area {
  width: 100%;
  text-align: left;
}

.image-area img {
  width: 104%;
  height: 460px;
  border-radius: 4px;
  transition: transform .2s;
  margin-bottom: 30%;
}

.image-area :hover {
  transform: scale(1.1);
}

.right-panel {
  width: 50%;
  padding: 2.5rem;
}

.product-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 1rem 0;
}

.product-desc {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.quantity-cart {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.quantity-cart button {
  padding: 0.4rem 0.7rem;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.add-to-cart {
  background: #ff3c3c;
  color: #140d0d;
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.add-to-cart:hover {
  background: #e02e2e;
}

.icon-btn {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tab {
  border: none;
  background: #eee;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}

.tab.active {
  background: #333;
  color: white;
}

.tab-content {
  font-size: 1rem;
  font-family: 'Times New Roman', Times, serif;
  color: #0c0808;
  line-height: 1.6;

}

.tab-content p {
  font-family: 'Times New Roman', Times, serif;

}

.recommend-section {
  padding: 2rem 4%;
  margin-top: 5px;

  /* background-color: #ffffff; */
}

.recommend-list {
  margin-left: 10%;
}

.recommend-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  margin-left: 9%;
  align-items: center;
}

/* .see-all {
  font-size: 0.9rem;
  text-decoration: none;
  color: #0056b3;
} */

.recommend-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.recommend-card {
  background: rgb(238, 234, 234);
  /* border :1px solid; */
  border-radius: 8px;
  padding: 0.5rem;
  width: 140px;
  flex-shrink: 0;
  text-align: center;
}

.recommend-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.recommend-card img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border: 1px solid black;
}


.book-title {
  display: block;
  font-family: 'Times New Roman', Times, serif;
  color: #06080a;
  text-decoration: none;
  margin: 0.2rem 0;
}

.author {
  font-size: 0.85rem;
  color: #444;
}

.rating {
  font-size: 0.85rem;
  color: #f39c12;
}

.icon-btn.wishlisted {
  color: red;
  transform: scale(1.2);
  animation: float 0.7s infinite alternate;
}

@keyframes float {
  0% {
    transform: scale(1.2) translateY(-3px);
  }

  100% {
    transform: scale(1.3) translateY(0px);
  }
}
</style>
