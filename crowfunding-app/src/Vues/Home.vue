<template>
    <div id="app" class="container h-100">
        <img class="bg" src="/src/assets/bg01.jpg" />
        <br /><br />
        <h1>Home Page</h1>
        <br /><br />
        <button class="btn btn-primary btn-lg" v-on:click="gotoprojects()">Go to projects →</button>
    </div>
</template>

<script>
    import Vue from "../main.js";

    export default {
        component: {
            Vue
        },
        data() {
            return {
                session: null
            }
        },
        methods: {
            gotoprojects: function () {
                this.$router.push('/projects');
//                this.$router.go(0);
            }
        }
    }
</script>

<style>
    /*body {*/
        /*margin: 0;*/
    /*}*/
    /*.row {*/
        /*!*background: url(/src/assets/bg01.jpg) no-repeat center center;*!*/
        /*height: 100vh;*/
    /*}*/
    .container {
        width:100vw;
        height:100vh;
        /*margin:0 auto;*/
        /*background:red;*/
        /*position:absolute;*/
        /*left:50%;*/
        /*top:50%;*/
        /*margin-left:-250px;*/
        /*margin-top:-250px;*/
    }
    img {
        z-index: -10;

        background-size: cover;
        /* Set rules to fill background */
        max-height: 100%;

        /* Set up proportionate scaling */
        height: 100vh;
        width: 100vw;

        /* Set up positioning */
        position: fixed;

        /* Align horizontally */
        left:0;
        right:0;
        margin:0 auto;
    }
</style>