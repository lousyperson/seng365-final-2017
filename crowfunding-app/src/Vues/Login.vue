<template>
    <div id="app">

        <button v-on:click="login">Log in</button>
    </div>
</template>

<script>
    import appvue from './App.vue';
    import Vue from '../main.js';

    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                session: null
            }
        },
        beforeCreate() {
            this.session = this.$session ? this.$session.exists() : null;
            if (this.session) {
                this.$router.go(-1);
            }
        },
        created() {

        },
        methods: {
            login: function () {
//                this.$http.post('localhost:4941/api/v2/users/login', {
////                    username: this.username,
////                    password: this.password,
//                    email: null,
//                    username: 1,
//                    password: 2
//                }).then(function (response) {
//                    if (response.status === 200 && 'token' in response.body) {
//                        this.$session.start();
//                        this.$session.set('jwt', response.body.token);
//                        Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token;
//                        this.$router.push('/panel/search')
//                    }
//                }, function (err) {
//                    console.log('err', err)
//                })
                this.$session.start();
                this.$session.set('X-Authorization', 5);
                this.$http.headers.common['X-Authorization'] = 5;
                this.$router.go(-1);
            }
        }
    }

    window.onload = function() {
        onLoad();
    };

    function onLoad() {

    }
</script>