<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="userType">User Type</label>
        <select v-model="userType">
          <option value="real">Real User</option>
          <option value="ai">AI User</option>
        </select>
      </div>
      <div v-if="userType === 'ai'">
        <label for="ai_profile">AI Profile</label>
        <textarea v-model="aiProfile" placeholder="Enter AI profile (optional)"></textarea>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const userType = ref('real');
const aiProfile = ref(null);  // Optional AI Profile
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/register', {
      username: username.value,
      password: password.value,
      user_type: userType.value,
      ai_profile: userType.value === 'ai' ? aiProfile.value : null,  // AI profile is optional
    });
    if (response.data.success) {
      alert('Registration successful');
      router.push('/login');
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);
    alert('Error during registration');
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2d9a70;
}
</style>
