<template>

  <body>
    <div class="auth-container row">
      <div class="col-md-6 d-flex align-items-center split-right">
        <div class="w-100" style="max-width: 350px; margin: auto">
          <p class="create text-center text-muted" style="font-family: Times New Roman, Times, serif;">Create Account
          </p>
          <form @submit.prevent="handleRegister">
            <!-- Name -->
            <div class="mb-3 position-relative">
              <i class="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input type="text" class="form-control ps-5 border rounded" v-model="name" placeholder="Name" />
            </div>

            <!-- Email -->
            <div class="mb-3 position-relative">
              <i class="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input type="text" class="form-control ps-5 border rounded" v-model="email" placeholder="Email" />
            </div>

            <!-- Password -->
            <div class="mb-3 position-relative">
              <i class="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input type="password" class="form-control ps-5 border rounded" v-model="password"
                placeholder="Password" />
            </div>

            <!-- Phone -->
            <div class="mb-3 position-relative">
              <i class="bi bi-telephone position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input type="tel" class="form-control ps-5 border rounded" v-model="phone" placeholder="Phone number" />
            </div>

            <div class="d-grid mt-3">
              <button class="btn btn-signin" style="font-family: Times New Roman, Times, serif;"
                type="submit">Register</button>
            </div>
          </form>
          <div class="text-center my-3 text-muted" style="font-family: Times New Roman, Times, serif;">or</div>

          <p class="text-center link" style="font-family:'Times New Roman', Times, serif;">  If you already have an account
            <a href="#" class="sign-in" style="font-family: Times New Roman, Times, serif;"
              @click="$router.push('/login')">Sign in</a>
          </p>
        </div>
      </div>
      <!-- Left Side -->
      <div class="col-md-6 split-left text-center">
        <img src="../assets/Images/reading.gif" alt="Bird Illustration" class="illustration mb-4" />
      </div>
    </div>
  </body>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Vue Router instance
const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const errorMessages = ref('');

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    });

    errorMessages.value = '';
    router.push('/login'); // Corrected routing method

  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessages.value = 'Invalid input data. Please check your entries.';
          break;
        case 401:
          errorMessages.value = 'Unauthorized access. Redirecting to login...';
          router.push('/login'); // Redirect user immediately
          break;
        case 409:
          errorMessages.value = 'This email is already registered. Try logging in instead.';
          break;
        default:
          errorMessages.value = 'An unexpected error occurred. Please try again later.';
      }
    } else {
      errorMessages.value = 'Network error. Please check your internet connection.';
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
  max-width: 700px;
  height: 490px;
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
  border: none;
  border-bottom: 1px solid #e7e0e0;
  border-radius: 0;
  margin-bottom: 15px;
  font-family: "Times New Roman", Times, serif;
  box-shadow: none;
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
  font-size: 20px;
  font-weight: bold;


}
</style>
