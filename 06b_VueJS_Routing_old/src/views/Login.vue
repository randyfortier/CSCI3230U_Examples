<template>
  <div class="login">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
      errorMessage: '',
    };
  },
}
</script>

<style scoped lang="scss">
.login {
  margin: 1rem;
}
</style>