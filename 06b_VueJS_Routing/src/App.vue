<template>
  <div id="app">
    <Header title="Contact Manager" />
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "app",
  components: {
    Header, Nav
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
