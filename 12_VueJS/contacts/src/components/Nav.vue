<template>
<div id="nav">
   <router-link to="/">Home</router-link> |
   <router-link to="/contacts">Contacts</router-link> |
   <router-link to="/about">About</router-link> |
   <router-link v-if="!loggedIn" to="/login">Log in</router-link>
   <a v-if="loggedIn" v-on:click="logout">Log out</a>
</div>
</template>

<script>
import auth from '../auth'

export default {
   name: "Header",
   data() {
      return {
         loggedIn: auth.loggedIn()
      }
   },
   created() {
      auth.onLoginStatusChanged = loggedIn => {
         this.loggedIn = auth.loggedIn();
      }
   },
   methods: {
      logout: function() {
         auth.logout((res) => {});
      }
   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
   text-align: center;
   background-color: #061921;
   padding-bottom: 2rem;
   padding-top: 0;
   a {
      text-decoration: none;
      cursor: pointer;
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
         color: #1673bd;
      }
   }
}
</style>
