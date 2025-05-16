<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.12.1/font/bootstrap-icons.min.css">
  <div id="app">

    <!-- Sidebar -->
    <div class="sidebar" :class="{ expanded: isSidebarExpanded }">
      <i id="toggleSidebar" class="bi bi-justify" @click="toggleSidebar"></i>
      <div class="menu-item" @click="Library">
        <i class="bi bi-book-half"></i> <span class="menu-text">Library</span>
      </div>
      <div class="menu-item">
        <i class="bi bi-stack"></i> <span class="menu-text">Categories</span>
      </div>
      <div class="menu-item">
        <i class="bi bi-bag-heart-fill"></i> <span class="menu-text">Shop</span>
      </div>
      <div class="menu-item">
        <i class="bi bi-suit-heart-fill"></i> <span class="menu-text">Wishlist</span>
      </div>
    </div>

    <!-- Top Navigation -->
    <div class="topbar">
      <div class="logo">Book <span>Store</span></div>
      <input type="text" v-model="searchQuery" class="form-control" placeholder="Search your Book..." />
      <div class="d-flex gap-4">
        <a href="#" class="text-dark" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
          <i class="bi bi-cart-fill" @click="cart"></i>
        </a>
        <div class="dropdown">
          <a href="#" class="text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-fill"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <h6 class="dropdown-header">Mcflurry</h6>
            </li>
            <li><router-link class="dropdown-item" to="/Sellerdash">My Profile</router-link></li>
            <li><a class="dropdown-item" href="#">My Library</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Offcanvas Cart -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="cartOffcanvasLabel">
          <i class="fas fa-shopping-bag me-2"></i>Cart
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body text-center">
        <p class="mb-4 fw-medium">Your Cart is Empty</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main">
      <!-- Hero Section -->
      <div class="d-flex align-items-center justify-content-center gap-5 flex-wrap text-center text-md-start my-5">
        <img src="/src/assets/images/book.gif" alt="Books" class="hero-img" />
        <h1 class="fw-bold">
          Get Your New<br />
          <span class="text-danger">Books Collection</span>
        </h1>
      </div>

      <!-- Tab Navigation -->
      <div class="container">
        <div class="navbar bg-body-secondary p-2 mb-4 rounded  gap-3 justify-content-center">
          <button class="btn btn-sm">Home</button>
          <button class="btn btn-sm">Newer Release</button>
          <button class="btn btn-sm">Top Selling</button>
          <button class="btn btn-sm">Wishlist</button>
          <button class="btn btn-sm">On Sale</button>
        </div>

        <!-- Featured & Recommended Section -->
        <div class="recommended mt-4">
          <h2 class="mb-3 fs-4 text-dark">Featured and Recommended</h2>
          <div
            class="featured-recommended bg-dark text-white rounded overflow-hidden d-flex flex-column flex-md-row mb-4 position-relative"
            style="min-height: 450px;">
            <!-- Left Arrow -->
            <button class="btn btn-light position-absolute top-50 start-0 translate-middle-y"
              style="opacity: 0.7; z-index: 10;" @click="prevSlide">
              <i class="bi bi-chevron-left"></i>
            </button>

            <div class="col-md-8 p-0 position-relative">
              <img :src="featuredImages[currentIndex].src" :alt="featuredImages[currentIndex].title" class="w-100"
                style="height: 450px; " />
              <div class="position-absolute bottom-0 start-0 p-3 w-100"
                style="background: linear-gradient(to left, rgba(49,55,63,0.75), rgba(158,195,228,0.75));">
                <h5>{{ featuredImages[currentIndex].title }}</h5>
              </div>
            </div>

            <div class="col-md-4 p-3 d-flex flex-column justify-content-center"
              style="background: linear-gradient(to right, #72849b, #627381); color: rgb(245,245,255);">
              <h5 class="text-center">{{ featuredImages[currentIndex].title }}</h5>
              <p class="text-center">{{ featuredImages[currentIndex].desc }}</p>
            </div>

            <!-- Right Arrow -->
            <button class="btn btn-light position-absolute top-50 end-0 translate-middle-y"
              style="opacity: 0.7 z-index 10;" @click="nextSlide"> <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- New Releases Section -->
        <div class="new-releases mt-3">
          <h2 class="mb-3 fs-4 text-dark" style="font-family: 'Times New Roman', Times, serif;">New Releases</h2>
          <div class="row d-flex flex-wrap gap-4 justify-content-start">
            <div class="col-6 col-md-2" v-for="book in books" :key="book.book_id">
              <div class="card border-2 shadow-sm" style="width: 200px;" @click=opnBookView(book)>
                <img :src="book.image" :alt="book.title" class="card-img-top"
                  style="height: 200px; object-fit: cover;" />
                <div class="card-body">
                  <p class="card-title fw-semibold mb-0 small text-dark">{{ book.title }}</p>
                  <p class="card-text small text-muted mb-0">{{ book.category }}</p>
                  <p class="card-text small text-secondary mb-0">{{ book.Author }}</p>
                  <p class="card-text small text-secondary mb-0">$ {{ book.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New Releases Section -->
        <div class="new-releases mt-3">
          <h2 class="mb-3 fs-4 text-dark" style="font-family: 'Times New Roman', Times, serif;">Best Seller</h2>
          <div class="row d-flex flex-wrap gap-4 justify-content-start">
            <div class="col-6 col-md-2" v-for="book in books" :key="book.book_id">
              <div class="card border-2 shadow-sm" style="width: 200px;">
                <img :src="book.image" :alt="book.title" class="card-img-top"
                  style="height: 200px; object-fit: cover;" />
                <div class="card-body">
                  <p class="card-title fw-semibold mb-0 small text-dark">{{ book.title }}</p>
                  <p class="card-text small text-muted mb-0">{{ book.category }}</p>
                  <p class="card-text small text-secondary mb-0">{{ book.Author }}</p>
                  <p class="card-text small text-secondary mb-0">$ {{ book.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- End container -->
    </div>
    <!-- End main content -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidebarExpanded = ref(false);
const searchQuery = ref("");

const featuredImages = ref([
  {
    src: "/src/assets/images/romance.jpg",
    title: "ROMANCE",
    desc: "Explore top picks in this category. Find the perfect title that suits your taste!"
  },
  {
    src: "/src/assets/images/adventure.jpg",
    title: "ADVENTURE",
    desc: "Get lost in thrilling journeys through mysterious worlds."
  },
  {
    src: "/src/assets/images/mystery.jpg",
    title: "MYSTERY",
    desc: "Uncover secrets with our most suspenseful reads."
  }
]);

const currentIndex = ref(0);

const books = ref([
  // {
  //   book_id: 5,
  //   seller_id: 1,
  //   title: "To Kill a Mockingbird",
  //   category: "Classic",
  //   Author: "Jessica Cunsolo",
  //   price: 30,
  //   book_description: "To Kill a Mockingbird is a story",
  //   image: "/src/assets/images/ali.jpg"
  // },
  // {
  //   book_id: 6,
  //   seller_id: 2,
  //   title: "1984",
  //   category: "Dystopian",
  //   Author: "George Orwell",
  //   price: 25,
  //   book_description: "A chilling prophecy about the future.",
  //   image: "/src/assets/images/anna.jpg"
  // },
  // {
  //   book_id: 7,
  //   seller_id: 3,
  //   title: "The Great Gatsby",
  //   category: "Classic",
  //   Author: "F. Scott Fitzgerald",
  //   price: 20,
  //   book_description: "A novel about the American dream.",
  //   image: "/src/assets/images/blair.jpg"
  // },
  // {
  //   book_id: 8,
  //   seller_id: 4,
  //   title: "The Hobbit",
  //   category: "Fantasy",
  //   Author: "J.R.R. Tolkien",
  //   price: 35,
  //   book_description: "A fantasy novel about the journey of Bilbo Baggins.",
  //   image: "/src/assets/images/cupid.jpg"
  // },
  // {
  //   book_id: 9,
  //   seller_id: 5,
  //   title: "Pride and Prejudice",
  //   category: "Romance",
  //   Author: "Jane Austen",
  //   price: 28,
  //   book_description: "A classic novel of manners and marriage.",
  //   image: "/src/assets/images/H.J.jpg"
  // },
]);

const products = async () => {
  try {
    let response = await fetch('http://localhost:3000/books'); // Corrected variable name
    if (!response.ok) {
      throw new Error('No data available');
    }
    books.value = await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

products();

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % featuredImages.value.length;
};

const prevSlide = () => {
  console.log('Previous slide clicked');
  currentIndex.value = (currentIndex.value - 1 + featuredImages.value.length) % featuredImages.value.length;
};

const opnBookView = (book) => {
  router.push({ name: "BookView", params: { bookData: JSON.stringify(book) } })
};
const cart = () => {
  router.push({ name: "Cart" });
};
const Library = () => {
  router.push({ name: "Library" });
};

</script>

<style scoped>
body {
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
  padding: 0;
  background-color: #fcfafa;
  width: 100vw;
}

.logo {
  font-family: 'Times New Roman', Times, serif;
  font-size: 24px;
  font-weight: bold;
}

.logo span {
  color: red;
}

.sidebar {
  width: 70px;
  background-color: rgba(196, 190, 190, 0.2);
  backdrop-filter: blur(1px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding-top: 70px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
}

.sidebar i {
  font-size: 20px;
  color: #000;
  cursor: pointer;
  margin: 20px 0;
  transition: transform 0.3s;
  padding-left: 10px;
}

.topbar {
  position: fixed;
  top: 0;
  left: 70px;
  right: 0;
  height: 60px;
  background-color: #fcfafa;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 999;
}

.topbar input {
  width: 300px;
}

.main {
  margin-left: 70px;
  margin-top: 60px;
  padding: 20px;
}

.hero-img {
  width: 300px;
  height: 250px;
  object-fit: cover;
  border-radius: 40px;
}

.book-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.book-card img:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.featured-section {
  display: flex;
  overflow-x: auto;
  gap: 20px;
}

.category-card {
  min-width: 250px;
  background-color: #6c757d;
  color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.category-card h5 {
  font-family: 'Times New Roman', Times, serif;

}

.btn:hover {
  transform: scale(1.05);
  color: rgb(177, 16, 5);
}

.navbar {
  width: 98%;
  margin-left: 40px;
}

.sidebar.expanded {
  width: 250px;
  align-items: flex-start;
  padding-left: 15px;
  transition: width 0.3s ease;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 2px 0;
  border-radius: 5px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.menu-item:hover {
  transform: translateY(-3px) scale(1);
  background-color: rgba(209, 20, 20, 0.05);
}

.menu-text {
  display: none;
  font-size: 15px;
  color: #000;
  font-family: 'Times New Roman', Times, serif;
}

.sidebar.expanded .menu-text {
  display: inline;
}

#toggleSidebar {
  margin-bottom: 10px;
  cursor: pointer;
  /* margin-right:0px; */
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.offcanvas {
  background-color: #f6f6f6;
}

.offcanvas .btn-dark {
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
}

.card-body {
  text-align: center;
}

.recommended {
  margin-left: 4%;
  cursor: pointer;
}

.new-releases {
  margin-left: 4%;
}

.bi {
  font-size: 1.70em;
  /* line-height: 2.00em; */
  vertical-align: -.075em;
}
</style>
