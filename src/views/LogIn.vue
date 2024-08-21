<template>
  <div class="login-container">
    <h2>Log In</h2>
    <hr class="hr"/>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Log In</button>
    </form>
    <RouterLink class="link" to="/signup">I don't have any account</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user?email=${email.value}&password=${password.value}`);
    const data = await response.json();

    if (response.ok && data.length > 0) {
      const userId = data[0].id;
      Cookies.set('userId', userId, { path: '/' });

      router.push('/');
    } else {
      console.error('Login failed: Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 35px;
  border: 1px solid #ccc;
  border-radius: 5% 20% 5%;
  background-color: #f9f9f9;
  justify-content: center;
  text-align: center;
  margin-top: 10%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

h2 {
  margin-bottom: 5px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: .5em;
  font-weight: bold;
  text-align: left;
  padding-left: 2px;
  margin-right: 10px;
  margin-top: 10px;
}

input {
  width: 70%;
  padding: .5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 15px;
  border: none;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 30% 90%;
  background-color: #49A4CB;
  color: white;
  font-size: 1em;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}

button:hover {
  background-color: #206c8c;
  border-radius: 90% 30%;
}

.hr {
  width: 70%;
  margin-bottom: 40px;
}

.link {
  text-decoration: none;
  color: black;
}
.link:hover {
  text-decoration: none;
}
</style>
