<template>
<div class="login">
   <LoginForm />
</div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
   name: "login",
   components: {
      LoginForm
   },
   data() {
      return {
         contacts: [],
         errorMessage: ''
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
    margin: 1rem;
}
</style>
