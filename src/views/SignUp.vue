<template>
    <div class="signup-container">
      <h2>Sign Up</h2>
      <hr class="hr"/>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="fullName" v-model="fullName" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">SignUp</button>
      </form>
      <RouterLink class="link" to="/login">I already have an account</RouterLink>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const fullName = ref('');
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleSignup = async () => {

    console.log(`Name: ${fullName.value}, Email: ${email.value}, Password: ${password.value}`);
    const user = {
    full_name: fullName.value,
    email: email.value,
    password: password.value,
    createdAt: Math.floor(Date.now() / 1000),
    picture: 'https://randomuser.me/api/portraits/men/1.jpg'
  };
  try {
    const response = await fetch('https://66bc281924da2de7ff69786f.mockapi.io//user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 201) {
      router.push('/login');
    } else {
      console.error('Signup failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error signing up:', error);
  }
};
  </script>
  
  <style scoped>
  .signup-container {
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
    text-decoration: underline;
    color: rgb(59, 102, 180);
  }
  .link:hover {
    text-decoration: none;
  }
  </style>
  