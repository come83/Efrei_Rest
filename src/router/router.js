import {createRouter, createWebHistory} from 'vue-router'
import Login from "../components/login.vue"
import FormPage from "../components/FormPage.vue";


const routes = [
    {path: '/', component: Login},
    {path: '/form-page', component: FormPage}
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router