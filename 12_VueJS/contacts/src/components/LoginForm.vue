<template>
<div id="login">
   <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
   <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" name="username" />

      <label for="password">Password:</label>
      <input type="password" v-model="password" name="password" />

      <button class="btn">Login</button>
   </form>
</div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
   return {
      username: 'Bret',
      password: 'Sincere@april.biz',
      errorMessage: ''
   };
  },
  methods: {
   login() {
      console.log('login called!');
   }
  }
}
</script>

<style scoped lang="scss">
form {
   width: 60%;
   display: grid;
   grid-template-columns: 200px 1fr;
   margin-top: 1rem;
   margin-bottom: 1rem;
}
label {
   margin: 1rem;
}
input[type="text"],input[type="password"] {
   margin: 1rem;
}
.btn {
   grid-column: 2;
   margin: 1rem;
}
</style>
