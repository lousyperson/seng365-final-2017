<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="/">
                Crowdfunding
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/projects">Projects</a>
                    </li>
                    <li class="nav-item" v-if="session">
                        <a class="nav-link" href="/create">Create Project</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav ml-auto" v-if="!session">
                    <li class="nav-item">
                        <a class="nav-link" href="/signup">Login/Sign up</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav ml-auto" v-else>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-on:click="logout">Sign out</a>
                    </li>
                </ul>
            </div>
        </nav>

        <router-view></router-view>
        <br/><br/>
    </div>
</template>

<script>
    import Vue from "../main.js";

    export default {
        component: {
            Vue
        },
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                session: null
            }
        },
        created() {
           this.session = this.$session ? this.$session.exists() : null;
        },
        methods: {
            logout: function () {
                if (this.$session) {
                    this.$session.destroy();
                    this.session = null;
                }
                this.$router.go(0);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    /*h1, h2 {*/
    /*font-weight: normal;*/
    /*}*/

    /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
    /*}*/

    /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
    /*}*/

    /*a {*/
    /*color: #42b983;*/
    /*}*/

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 15px;
        text-align: left;
    }

    thead {
        font-weight: bold;
        background-color: #3fa338;
        color: #FFFFFF;
    }
</style>
