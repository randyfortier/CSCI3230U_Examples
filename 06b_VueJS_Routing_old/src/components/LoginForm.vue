<template>
    <div id="login">
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" 
                   v-model="username" 
                   name="username" 
                   placeholder="Username" />
            
            <label for="password">Password:</label>
            <input type="password" 
                   v-model="password" 
                   name="password" 
                   placeholder="Password" />

            <button class="btn">Login</button>
        </form>
    </div>
</template>

<script>
import auth from '../auth.js';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: 'Bret',
            password: 'Sincere@april.biz',
            errorMessage: '',
        };
    },
    methods: {
        login() {
            auth.login(this.username, this.password, (response) => {
                if (!response.authenticated) {
                    this.errorMessage = 'Login Incorrect';
                } else {
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            });
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
input[type="text"], input[type="password"] {
    margin: 1rem;
}
button {
    grid-column: 2;
    margin: 1rem;
}
</style>