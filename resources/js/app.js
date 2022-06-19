require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from "./components/App"
import Home from "./components/Home";
import Desk from "./components/desks/Desk";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/desks',
            name: 'desks',
            component: Desk
        },
    ]
})
const app = new Vue({
    el: '#app',
    components: {App},
    router
});



// "vue": "^3.2.37",
