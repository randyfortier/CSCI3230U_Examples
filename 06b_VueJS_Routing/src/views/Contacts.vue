<template>
  <div class="contacts">
    <ContactList :contacts="contacts" v-on:delete-contact="deleteContact" />
    <AddContact v-on:add-contact="addContact" />
  </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue';
import AddContact from '@/components/AddContact.vue';
import axios from 'axios';

export default {
  name: 'Contacts',
  components: {
    ContactList, AddContact
  },
  data() {
    return {
      contacts: [],
    };
  },
  created: function() {
    axios.get('https://jsonplaceholder.typicode.com/users')
         .then((response) => this.contacts = response.data)
         .catch((error) => console.log(error));
  },
  methods: {
    deleteContact(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
           .then(() => {
             this.contacts = this.contacts.filter((contact) => contact.id !== id);
           })
           .catch((error) => console.log(error));
    },
    addContact(newContact) {
      const {
        name, phone, email, website
      } = newContact;
      axios.post('https://jsonplaceholder.typicode.com/users', {
        name, phone, email, website
      }).then((response) => {
        this.contacts = [...this.contacts, response.data];
      }).catch((error) => console.log(error));
    },
  },
}
</script>