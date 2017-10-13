import Vue from 'vue';
import App from './Vues/App.vue';
import Home from './Vues/Home.vue';
import Project from './Vues/Project.vue';
import Projects from './Vues/Projects.vue';
import Login from './Vues/Login.vue';
import Signup from './Vues/Signup.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueSession from 'vue-session';
Vue.use(VueSession);

Vue.http.options.emulateJSON = true;

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/projects/:projectId",
        name: "project",
        component: Project
    },
    {
        path: "/projects",
        name: "projects",
        component: Projects
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/signup",
        name: "signup",
        component: Signup
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

export default new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
