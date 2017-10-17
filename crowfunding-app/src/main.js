import Vue from 'vue';
import App from './Vues/App.vue';
import Home from './Vues/Home.vue';
import Project from './Vues/Project.vue';
import Projects from './Vues/Projects.vue';
import Signup from './Vues/Signup.vue';
import Profile from './Vues/Profile.vue';
import Create from './Vues/Create.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueSession from 'vue-session';
Vue.use(VueSession);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;

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
        path: "/signup",
        name: "signup",
        component: Signup
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile
    },
    {
        path: "/create",
        name: "create",
        component: Create
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
