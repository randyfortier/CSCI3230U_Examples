<template>
  <div id="app">
   <Header title="Contact Manager" />
   <Nav />
   <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';

export default {
   name: 'home',
   components: { Header, Nav }
};
</script>

<style lang="scss">
body {
   margin: 0;
}
#app {
   font-family: Helvetica, Arial, sans-serif;
   color: #2c3e50;
}
</style>
