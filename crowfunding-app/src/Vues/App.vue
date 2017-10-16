<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="/">
                <!--<img src="../assets/cflogonew.png" height="50" class="d-inline-block align-top" alt="">-->
                Crowdfunding
            </a>
            <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
                <!--<span class="navbar-toggler-icon"></span>-->
            <!--</button>-->

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/projects">Projects</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav ml-auto" v-if="!session">
                    <li class="nav-item">
                        <a class="nav-link" href="/signup">Login/Sign up</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav ml-auto" v-else>
                    <li class="nav-item">
                        <a class="nav-link" v-on:click="logout">Sign out</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!--<div class="topNav" id="myTopNav">-->
            <!--<ul class="topNavList">-->
                <!--<li><a href="/">Home</a></li>-->
                <!--<li class="last"><a href="/projects">Projects</a></li>-->
            <!--</ul>-->
        <!--</div>-->

        <br/><br/>
        <router-view></router-view>
        <br/><br/>
    </div>
</template>

<script>
    export default {
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

    /* Base Styles */
    /*#myTopNav > ul,*/
    /*#myTopNav > ul li,*/
    /*#myTopNav > ul ul {*/
        /*list-style: none;*/
        /*margin: 0;*/
        /*padding: 0;*/
    /*}*/

    /*#myTopNav > ul {*/
        /*position: relative;*/
        /*z-index: 597;*/
    /*}*/

    /*#myTopNav > ul li {*/
        /*float: left;*/
        /*min-height: 1px;*/
        /*line-height: 1.3em;*/
        /*vertical-align: middle;*/
    /*}*/

    /*#myTopNav > ul li.hover,*/
    /*#myTopNav > ul li:hover {*/
        /*position: relative;*/
        /*z-index: 599;*/
        /*cursor: default;*/
    /*}*/

    /*#myTopNav > ul ul {*/
        /*visibility: hidden;*/
        /*position: absolute;*/
        /*top: 100%;*/
        /*left: 0;*/
        /*z-index: 598;*/
        /*width: 100%;*/
    /*}*/

    /*#myTopNav > ul ul li {*/
        /*float: none;*/
    /*}*/

    /*#myTopNav > ul ul ul {*/
        /*top: 1px;*/
        /*left: 99%;*/
    /*}*/

    /*#myTopNav > ul li:hover > ul {*/
        /*visibility: visible;*/
    /*}*/

    /*!* Align last drop down RTL *!*/
    /*#myTopNav > ul > li.last ul ul {*/
        /*left: auto !important;*/
        /*right: 99%;*/
    /*}*/

    /*#myTopNav > ul > li.last ul {*/
        /*left: auto;*/
        /*right: 0;*/
    /*}*/

    /*#myTopNav > ul > li.last {*/
        /*text-align: right;*/
    /*}*/

    /*!* Theme Styles *!*/
    /*#myTopNav > ul {*/
        /*border-top: 4px solid #3fa338;*/
        /*font-family: Calibri, Tahoma, Arial, sans-serif;*/
        /*font-size: 14px;*/
        /*background: #1e1e1e;*/
        /*background: -moz-linear-gradient(top, #1e1e1e 0%, #040404 100%);*/
        /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #1e1e1e), color-stop(100%, #040404));*/
        /*background: -webkit-linear-gradient(top, #1e1e1e 0%, #040404 100%);*/
        /*background: linear-gradient(top, #1e1e1e 0%, #040404 100%);*/
        /*width: auto;*/
        /*zoom: 1;*/
    /*}*/

    /*#myTopNav > ul:before {*/
        /*content: '';*/
        /*display: block;*/
    /*}*/

    /*#myTopNav > ul:after {*/
        /*content: '';*/
        /*display: table;*/
        /*clear: both;*/
    /*}*/

    /*#myTopNav > ul li a {*/
        /*display: inline-block;*/
        /*padding: 10px 22px;*/
    /*}*/

    /*#myTopNav > ul > li.active,*/
    /*#myTopNav > ul > li.active:hover {*/
        /*background-color: #3fa338;*/
    /*}*/

    /*#myTopNav > ul > li > a:link,*/
    /*#myTopNav > ul > li > a:active,*/
    /*#myTopNav > ul > li > a:visited {*/
        /*color: #ffffff;*/
    /*}*/

    /*#myTopNav > ul > li > a:hover {*/
        /*color: #ffffff;*/
    /*}*/

    /*#myTopNav > ul ul ul {*/
        /*top: 0;*/
    /*}*/

    /*#myTopNav > ul li li {*/
        /*background-color: #ffffff;*/
        /*border-bottom: 1px solid #ebebeb;*/
        /*font-size: 12px;*/
    /*}*/

    /*#myTopNav > ul li.hover,*/
    /*#myTopNav > ul li:hover {*/
        /*background-color: #F5F5F5;*/
    /*}*/

    /*#myTopNav > ul > li.hover,*/
    /*#myTopNav > ul > li:hover {*/
        /*background-color: #3fa338;*/
        /*-webkit-box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);*/
        /*-moz-box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);*/
        /*box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);*/
    /*}*/

    /*#myTopNav > ul a:link,*/
    /*#myTopNav > ul a:visited {*/
        /*color: #9a9a9a;*/
        /*text-decoration: none;*/
    /*}*/

    /*#myTopNav > ul a:hover {*/
        /*color: #9a9a9a;*/
    /*}*/

    /*#myTopNav > ul a:active {*/
        /*color: #9a9a9a;*/
    /*}*/

    /*#myTopNav > ul ul {*/
        /*border: 1px solid #CCC \9;*/
        /*-webkit-box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);*/
        /*-moz-box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);*/
        /*box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);*/
        /*width: 150px;*/
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
