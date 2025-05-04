<template>

  <head>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto&display=swap"
      rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  </head>

  <div class="sidebar" id="sidebar">
    <i class="fas fa-bars" id="toggleSidebar"></i>
    <div class="menu-item">
      <i class="fas fa-book"></i> <span class="menu-text">Library</span>
    </div>
    <div class="menu-item">
      <i class="fas fa-layer-group"></i> <span class="menu-text">Categories</span>
    </div>
    <div class="menu-item">
      <i class="fas fa-shopping-bag"></i> <span class="menu-text">Shop</span>
    </div>
    <div class="menu-item">
      <i class="fas fa-heart"></i> <span class="menu-text">Wishlist</span>
    </div>
  </div>
</template>

<style>
.sidebar {
  width: 70px;
  background-color: rgba(196, 190, 190, 0.2);
  /* Transparent white */
  backdrop-filter: blur(1px);
  /* Optional: adds blur behind the sidebar */
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0px;
  height: 100vh;
  padding-top: 70px;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  z-index: 1000;
}

.sidebar i {
  font-size: 20px;
  color: #000;
  cursor: pointer;
}
</style>
