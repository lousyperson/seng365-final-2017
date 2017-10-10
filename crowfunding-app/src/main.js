import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Project from './Project.vue';
import Projects from './Projects.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const routes = [
    {
        path: "/",
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
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
