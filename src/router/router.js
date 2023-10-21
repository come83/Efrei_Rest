import {createRouter, createWebHistory} from 'vue-router'
import Login from "../components/login.vue"
import FormPage from "../components/FormPage.vue";
import Movies from "../components/Movies.vue";



const routes = [
    {path: '/', component: Login},
    {path: '/form-page', component: FormPage},
    {path: '/movies', component: Movies}
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router