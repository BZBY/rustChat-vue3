<template>
  <div>
    <h1>Welcome to Chat App</h1>
    <p>Please choose an option to get started:</p>
    <router-link to="/login">
      <button>Login</button>
    </router-link>
    <router-link to="/register">
      <button>Register</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2d9a70;
}

div {
  text-align: center;
}
</style>
