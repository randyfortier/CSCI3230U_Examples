<template>
<div class="contacts">
   <ContactList :contacts="contacts" v-on:delete-contact="deleteContact" />
   <AddContact v-on:add-contact="addContact" />
</div>
</template>

<script>
// @ is an alias to /src
import ContactList from "@/components/ContactList.vue";
import AddContact from "@/components/AddContact.vue";
import axios from 'axios';

export default {
   name: "contacts",
   components: {
      ContactList,
      AddContact
   },
   data() {
      return {
         contacts: []
      }
   },
   created: function() {
      axios.get('https://jsonplaceholder.typicode.com/users')
         .then(res => this.contacts = res.data)
         .catch(err => console.log(err));
   },
   methods: {
      deleteContact(id) {
         axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => this.contacts = this.contacts.filter(contact => contact.id !== id))
            .catch(err => console.log(err));
      },
      addContact(newContact) {
         const {
            name,
            phone,
            email,
            website
         } = newContact;
         axios.post('https://jsonplaceholder.typicode.com/users', {
               name,
               phone,
               email,
               website
            }).then(res => this.contacts = [...this.contacts, res.data])
            .catch(err => console.log(err));
      }
   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contacts {
    margin: 1rem;
}
</style>
