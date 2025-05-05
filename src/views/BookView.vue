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
      <p class="product-desc">by {{ book.Author }}</p>

      <div class="quantity-cart">
        <button>-</button>
        <span>1</span>
        <button>+</button>
        <button class="add-to-cart">Add to cart</button>
        <button class="icon-btn"><i class="fas fa-heart"></i></button>
      </div>

      <div class="tabs">
        <button class="tab active">Summary</button>
        <button class="tab">Meta Information</button>
        <button class="tab">Reviews (0)</button>
      </div>

      <div class="tab-content">
        <p>
          This captivating book takes readers on an emotional journey filled with unexpected twists and heartfelt moments.
          At its core, it explores themes of love, loss, and the resilience of the human spirit.
          The protagonist faces numerous challenges that test their strength and character.
          Along the way, unforgettable friendships are formed and deeply moving revelations come to light.
          The author masterfully weaves a narrative that balances suspense with tender reflection.
          Each chapter leaves the reader yearning to uncover what happens next.
          Vivid descriptions and rich storytelling bring every scene to life.
          The characters are complex, relatable, and undergo significant development throughout the story.
          By the final page, the reader is left with a lasting impression and a deeper understanding of life’s complexities.
          This book is a must-read for anyone who enjoys a compelling and thought-provoking story.
        </p>
      </div>
    </div>
  </div>

  <!-- 📚 Recommended Books Section -->
  <div class="recommend-section">
    <h3 class="recommend-title">
      Readers also enjoyed
      <!-- <a href="#" class="see-all">See all</a> -->
    </h3>
    <div class="recommend-list">
      <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="Hell University" />
        <a href="#" class="book-title">Hell University</a>
        <p class="author">KnightInBlack</p>
       
      </div>

      <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="Hopeless Romantic" />
        <a href="#" class="book-title">Hopeless Romantic</a>
        <p class="author">Strawberry</p>
    
      </div>

      <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="He's Into Her" />
        <a href="#" class="book-title">He's into her</a>
        <p class="author">Maxinejiji</p>
      
      </div>

      <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="Ang Mutya" />
        <a href="#" class="book-title">Ang Mutya ng Section E, Part 3</a>
        <p class="author">Eatmore2behappy</p>
        
      </div>

      <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="Ang Mutya" />
        <a href="#" class="book-title">Ang Mutya ng Section E, Part 3</a>
        <p class="author">Eatmore2behappy</p>
       
      </div>

          <div class="recommend-card">
        <img src="/src/assets/images/cupid.jpg" alt="Ang Mutya" />
        <a href="#" class="book-title">Ang Mutya ng Section E, Part 3</a>
        <p class="author">Eatmore2behappy</p>
   
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const book = ref(JSON.parse(route.params.bookData));
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
.tab-content{
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
.tab-content p{    
  font-family: 'Times New Roman', Times, serif;

}
.recommend-section {
  padding: 2rem 4%;
  margin-top: 5px;
  
  /* background-color: #ffffff; */
}
.recommend-list{
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
  background:    rgb(238, 234, 234);
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
.recommend-card img:hover{
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
  </style>
