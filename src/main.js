import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue'
import Home from './Home.vue'
import About from './About.vue'
import Login from './Login.vue'
import User from './User.vue'
import Project from './Project.vue'
import CreateProject from './CreateProject.vue'
import CreateHp from './CreateHp.vue';
import Hp from './Hp.vue';

const app = createApp(App);

app.use(createPinia());

app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/about",
            name: "about",
            component: About,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/users/:id",
            name: "users",
            component: User,
        },
        {
            path: "/projects/:id",
            name: "projects",
            component: Project,
        },
        {
            path: "/hps/:id",
            name: "hps",
            component: Hp,
        },
        {
            path: "/add-project",
            name: "add-project",
            component: CreateProject,
        },
        {
            path: "/add-hp",
            name: "add-hp",
            component: CreateHp,
        }
    ],
}));

app.mount("#app");
