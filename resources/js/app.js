require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import {Vuelidate} from "vuelidate"

Vue.use(VueRouter)
Vue.use(Vuelidate)

import App from "./components/App"
import Home from "./components/Home";
import Desk from "./components/desks/Desk";
import ShowDesk from "./components/desks/ShowDesk";

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
        {
            path: '/desks/:id',
            name: 'showDesk',
            component: ShowDesk,
            props: true
        },
    ]
})
const app = new Vue({
    el: '#app',
    components: {App},
    router
});



// "vue": "^3.2.37",
