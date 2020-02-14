<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contacts">Contacts</router-link> |
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
export default {
    name: 'Nav'
};
</script>

<style scoped>
#nav {
    text-align: center;
    background-color: #061921;
    padding-bottom: 2rem;
    padding-top: 0;
}
#nav a {
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    color: #2c3e50;
}
#nav a &.router-link-exact-active {
    color: #1673bd;
}
</style>