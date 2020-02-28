<template>
<div id="addContact">
    <form @submit="addContact">
        <input type="text" v-model="name" placeholder="Full name" />
        <input type="text" v-model="phone" placeholder="Phone number" />
        <input type="text" v-model="email" placeholder="E-Mail address" />
        <input type="text" v-model="website" placeholder="Website URL" />
        <button class="btn">Add Contact</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'AddContact',
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            website: '',
        };
    },
    methods: {
        addContact(event) {
            event.preventDefault();
            const newContact = {
                name: this.name,
                phone: this.phone,
                email: this.email,
                website: this.website,
            };
            this.$emit('add-contact', newContact);

            this.name = '';
            this.phone = '';
            this.email = '';
            this.website = '';
        }
    }
};
</script>

<style lang="scss" scoped>
.addContact {
    margin-left: auto;
    margin-right: auto;
}
form {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
input[type="text"] {
    padding: 0.5rem;
}
</style>