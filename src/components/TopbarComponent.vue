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

  <div class="topbar">
    <div class="logo">Book <span>Store</span></div>
    <input type="text" class="form-control" style="font-family: 'Times New Roman', Times, serif;"
      placeholder="Search your Book...">
    <div class="d-flex gap-4">
      <a href="#" class="text-dark" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
        <i class="fas fa-shopping-cart fa-lg"></i>
      </a>
      <div class="dropdown">
        <a href="#" class="text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-user fa-lg"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <h6 class="dropdown-header">Mcflurry</h6>
          </li>
          <li><a class="dropdown-item" href="#">My Profile</a></li>
          <li><a class="dropdown-item" href="#">My Library</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign in</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>
