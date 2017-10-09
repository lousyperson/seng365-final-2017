<template>
    <div id="app">
        <div class="topNav" id="myTopNav">
            <ul class="topNavList">
                <li><a href="/">Home</a></li>
                <li class="last"><a href="/projects">Projects</a></li>
            </ul>
        </div>

        <br/><br/>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }

    window.onload = function() {
        onLoad();
    };

    function onLoad() {
        let path = window.location.href;
        let topNavNodes = document.querySelectorAll(".topNavList");
        topNavNodes.item(0).childNodes.forEach((value, index, listObj) => {
            if (value.nodeName === "LI") {
                if (value.childNodes.item(0).href === path) {
                    value.classList.remove("active");
                    value.classList.add("active");
                }
            }
        });
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
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
    #myTopNav > ul,
    #myTopNav > ul li,
    #myTopNav > ul ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    #myTopNav > ul {
        position: relative;
        z-index: 597;
    }

    #myTopNav > ul li {
        float: left;
        min-height: 1px;
        line-height: 1.3em;
        vertical-align: middle;
    }

    #myTopNav > ul li.hover,
    #myTopNav > ul li:hover {
        position: relative;
        z-index: 599;
        cursor: default;
    }

    #myTopNav > ul ul {
        visibility: hidden;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 598;
        width: 100%;
    }

    #myTopNav > ul ul li {
        float: none;
    }

    #myTopNav > ul ul ul {
        top: 1px;
        left: 99%;
    }

    #myTopNav > ul li:hover > ul {
        visibility: visible;
    }

    /* Align last drop down RTL */
    #myTopNav > ul > li.last ul ul {
        left: auto !important;
        right: 99%;
    }

    #myTopNav > ul > li.last ul {
        left: auto;
        right: 0;
    }

    #myTopNav > ul > li.last {
        text-align: right;
    }

    /* Theme Styles */
    #myTopNav > ul {
        border-top: 4px solid #3fa338;
        font-family: Calibri, Tahoma, Arial, sans-serif;
        font-size: 14px;
        background: #1e1e1e;
        background: -moz-linear-gradient(top, #1e1e1e 0%, #040404 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #1e1e1e), color-stop(100%, #040404));
        background: -webkit-linear-gradient(top, #1e1e1e 0%, #040404 100%);
        background: linear-gradient(top, #1e1e1e 0%, #040404 100%);
        width: auto;
        zoom: 1;
    }

    #myTopNav > ul:before {
        content: '';
        display: block;
    }

    #myTopNav > ul:after {
        content: '';
        display: table;
        clear: both;
    }

    #myTopNav > ul li a {
        display: inline-block;
        padding: 10px 22px;
    }

    #myTopNav > ul > li.active,
    #myTopNav > ul > li.active:hover {
        background-color: #3fa338;
    }

    #myTopNav > ul > li > a:link,
    #myTopNav > ul > li > a:active,
    #myTopNav > ul > li > a:visited {
        color: #ffffff;
    }

    #myTopNav > ul > li > a:hover {
        color: #ffffff;
    }

    #myTopNav > ul ul ul {
        top: 0;
    }

    #myTopNav > ul li li {
        background-color: #ffffff;
        border-bottom: 1px solid #ebebeb;
        font-size: 12px;
    }

    #myTopNav > ul li.hover,
    #myTopNav > ul li:hover {
        background-color: #F5F5F5;
    }

    #myTopNav > ul > li.hover,
    #myTopNav > ul > li:hover {
        background-color: #3fa338;
        -webkit-box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
        -moz-box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
        box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
    }

    #myTopNav > ul a:link,
    #myTopNav > ul a:visited {
        color: #9a9a9a;
        text-decoration: none;
    }

    #myTopNav > ul a:hover {
        color: #9a9a9a;
    }

    #myTopNav > ul a:active {
        color: #9a9a9a;
    }

    #myTopNav > ul ul {
        border: 1px solid #CCC \9;
        -webkit-box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);
        box-shadow: 0 0px 2px 1px rgba(0, 0, 0, 0.15);
        width: 150px;
    }
</style>
