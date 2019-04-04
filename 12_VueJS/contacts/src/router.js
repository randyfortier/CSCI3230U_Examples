import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Contacts from "./views/Contacts.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/contacts", name: "contacts", component: Contacts },
    { path: "/login", name: "login", component: Login },
    { path: "/about", name: "about", component: About }
  ]
});
