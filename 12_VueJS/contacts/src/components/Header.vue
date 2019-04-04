<template>
<div class="header">
   <img alt="CM logo" src="../assets/logo.png" class="logo" />
</div>
</template>

<script>
export default {
   name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
    background-color: #061921;
    text-align: center;
    padding: 1rem;
}
.logo {
   width: 10rem;
   height: auto;
}
</style>
