<template>
  <div class="auth-container row">
    <!-- Left Side -->
    <div class="col-md-6 split-left text-center">
      <img src="@/assets/Images/books.gif" alt="Library Illustration" class="illustration mb-4" />
    </div>

    <!-- Right Side -->
    <div class="col-md-6 d-flex align-items-center split-right">
      <div class="w-100" style="max-width: 350px; margin: auto">
        <h2 class="mb-3 text-center">Library</h2>
        <p class="text-center text-muted">Welcome to the Books Store</p>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="text" class="form-control" placeholder="Enter your email" />
        </div>

        <div class="mb-2">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" placeholder="Enter your password" />
        </div>

        <div class="d-grid mt-3">
          <button class="btn btn-signin">Log in</button>
        </div>

        <div class="text-center my-3 text-muted">or</div>

        <p class="text-center link">Don't have an account yet?
          <a href="#" class="create">Create Account</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-container {
  max-width: 900px;
  margin: 50px auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.split-left {
  background: linear-gradient(to right, #808994, #3c729e);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  color: white;
}

.split-right {
  padding: 3rem;
}

.illustration {
  max-width: 250px;
  height: auto;
}

.btn-signin {
  background-color: #555;
  color: white;
  border-radius: 15px;
  width: 100%;
}

.form-control {
  border-bottom: 1px solid #e7e0e0;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: left;
}

.link {
  font-size: 0.9rem;
}

.form-control:focus {
  border-color: #ccc;
  box-shadow: none;
  outline: none;
}

.create {
  text-decoration: underline;
}
</style>
