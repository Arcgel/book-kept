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
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" v-model="email" placeholder="Enter your email" />
          </div>

          <div class="mb-2">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter your password" />
          </div>

          <div class="d-grid mt-3">
            <button class="btn btn-signin" type="submit">Log in</button>
          </div>

          <div class="text-center my-3 text-muted">or</div>

          <p class="text-left link" style="font-family: 'Times New Roman', Times, serif;">Don't have an account yet?
            <a href="#" class="create" @click="$router.push('/register')" style="font-family:'Times New Roman', Times, serif">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Corrected router instance
const email = ref('');
const password = ref('');
const errorMessages = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', response.data.token);
    errorMessages.value = '';
    router.push('/'); // Redirects after successful login

  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessages.value = 'Invalid email or password. Please try again.';
          break;
        case 403:
          errorMessages.value = 'Access forbidden. Please contact support.';
          break;
        default:
          errorMessages.value = 'An unexpected error occurred. Please try again later.';
      }
    } else {
      errorMessages.value = 'Network error. Please check your connection.';
    }
  }
};
</script>

<style scoped>
body,
html {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #f7f7f7;
}

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
  /* border: none; */
  border-bottom: 1px solid #e7e0e0;
  border-radius: 5px;
  margin-bottom: 15px;
  font-family: "Times New Roman", Times, serif;
  box-shadow: none;
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
