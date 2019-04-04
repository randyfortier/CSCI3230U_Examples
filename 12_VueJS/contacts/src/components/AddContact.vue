<template>
<div id="addContact">
   <form @submit="addContact">
      <input type="text" v-model="name" name="name" placeholder="Full Name" />
      <input type="text" v-model="phone" name="phone" placeholder="Phone Number" />
      <input type="text" v-model="email" name="email" placeholder="E-Mail Address" />
      <input type="text" v-model="website" name="website" placeholder="Website URL" />
      <button class="btn">Add Contact</button>
   </form>
</div>
</template>

<script>
export default {
  name: "AddContact",
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      website: ''
    }
  },
  methods: {
    addContact(event) {
      event.preventDefault();
      const newContact = {
         name: this.name,
         phone: this.phone,
         email: this.email,
         website: this.website
      }

      // emit this event to the parent component
      this.$emit('add-contact', newContact);

      this.name = '';
      this.phone = '';
      this.email = '';
      this.website = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
input[type="text"] {
  padding: 5px;
}
</style>
