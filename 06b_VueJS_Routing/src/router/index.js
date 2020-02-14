import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/login', name: 'Login', component: Login },
  { path: '/about', name: 'About', component: About },
]

const router = new VueRouter({
  routes
})

export default router
