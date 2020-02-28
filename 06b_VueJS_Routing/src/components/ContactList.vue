<template>
<div id="contactList">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>E-Mail</th>
                <th>Website</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-bind:key="contact.id" v-for="contact in contacts">
                <td>{{ contact.name }}</td>
                <td>{{ contact.phone }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.website }}</td>
                <td>
                    <img src="../assets/delete.png" 
                         class="delete"
                         @click="$emit('delete-contact', contact.id)" />
                </td>
            </tr>
        </tbody>
    </table>
</div>    
</template>

<script>
//import Vue from 'vue';

export default {
    name: 'ContactList',
    props: {
        contacts: Array,
    }
};
</script>

<style scoped lang="scss">
table {
    border: 2px solid #1673bd;
    border-radius: 3px;
    background-color: #f9f9f9;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    font-size: 90%;
    th {
        background-color: #2c3e50;
        color: rgba(255, 255, 255, 0.66);
    }
    td {
        .delete {
            width: 1rem;
            height: auto;
            cursor: pointer;
        }
    }
    th, td {
        padding: 0.5rem;
        min-width: 120px;
    }
}
</style>