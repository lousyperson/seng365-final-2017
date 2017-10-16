<template>
    <div>
        <div class="lightbox-target" id="projImg">
            <img :src="getImage(projectId)"/>
            <a class="lightbox-close" v-on:click="scrollTo(projectId)"></a>
        </div>

        <h1>{{ pageTitle }}</h1>
        <input type="text" id="filterInput" v-on:keyup="filterFunction" placeholder="Filter project..." />
        <br /><br />

        <div class="container">
            <div id="projects" class="row">
                <div class="col-lg-4" v-for="project in projects">
                    <div class="card">
                        <div v-if="project.open === true" class="projectsRow" :title="getProjectTitle(project.title + ' ' + project.subtitle)">
                            <div class="card-img-top" :style="{ background: 'url(' + getImage(project.id) + ') 50% 50% no-repeat', width: '100%', height: '250px' }">
                                <!--<img class="card-img-top" :src="getImage(project.id)" height="600px" />-->
                            </div>

                            <div class="card-body">
                                <h4 class="card-title"><router-link :to="{ name: 'project', params: { projectId: project.id }}">{{ project.title }}</router-link></h4>
                                <p class="card-text">{{ project.subtitle }}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                projects: [],
                projectId: 0,
                pageTitle: 'Projects'
            }
        },
        mounted: function () {

        },
        created() {
            this.getProjects();
        },
        methods: {
            getProjects: function () {
                this.$http.get('http://localhost:4941/api/v2/projects')
                    .then(function (response) {
                        this.projects = response.data;
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    })
            },

            getImage: function (id) {
                if (id > 0) {
                    return 'http://localhost:4941/api/v2/projects/' + id + '/image'
                }
                return null;
            },

            getProjectTitle: function (title) {
                return title;
            },

            filterFunction: function () {
                let input, filter, td;
                input = document.getElementById('filterInput');
                filter = input.value.toUpperCase();
                td = document.querySelectorAll(".projectsRow");
                td.forEach((value, index, listObj) => {
                    let title = value.title.toUpperCase();
                    if (title.indexOf(filter) < 0) {
                        value.style.display = "none";
                    } else {
                        value.style.display = "";
                    }
                })
            },
            
            scrollTo: function (hash) {
                let y = window.scrollY;
                location.hash = "#" + hash;
                window.scrollTo(0, y);
            }
        }
    }
</script>

<style>
    /* Styles the thumbnail */

    a.lightbox img {
        height: 150px;
        border: 3px solid white;
        box-shadow: 0px 0px 8px rgba(0,0,0,.3);
        margin: 94px 20px 20px 20px;
    }

    /* Styles the lightbox, removes it from sight and adds the fade-in transition */

    .lightbox-target {
        position: fixed;
        top: -100%;
        width: 100%;
        background: rgba(0,0,0,.7);
        width: 100%;
        opacity: 0;
        -webkit-transition: opacity .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out;
        transition: opacity .5s ease-in-out;
        overflow: hidden;
    }

    /* Styles the lightbox image, centers it vertically and horizontally, adds the zoom-in transition and makes it responsive using a combination of margin and absolute positioning */

    .lightbox-target img {
        margin: auto;
        position: absolute;
        top: 0;
        left:0;
        right:0;
        bottom: 0;
        max-height: 0%;
        max-width: 0%;
        border: 3px solid white;
        box-shadow: 0px 0px 8px rgba(0,0,0,.3);
        box-sizing: border-box;
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
    }

    /* Styles the close link, adds the slide down transition */

    a.lightbox-close {
        display: block;
        width:50px;
        height:50px;
        box-sizing: border-box;
        background: white;
        color: black;
        text-decoration: none;
        position: absolute;
        top: -80px;
        right: 0;
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
    }

    /* Provides part of the "X" to eliminate an image from the close link */

    a.lightbox-close:before {
        content: "";
        display: block;
        height: 30px;
        width: 1px;
        background: black;
        position: absolute;
        left: 26px;
        top:10px;
        -webkit-transform:rotate(45deg);
        -moz-transform:rotate(45deg);
        -o-transform:rotate(45deg);
        transform:rotate(45deg);
    }

    /* Provides part of the "X" to eliminate an image from the close link */

    a.lightbox-close:after {
        content: "";
        display: block;
        height: 30px;
        width: 1px;
        background: black;
        position: absolute;
        left: 26px;
        top:10px;
        -webkit-transform:rotate(-45deg);
        -moz-transform:rotate(-45deg);
        -o-transform:rotate(-45deg);
        transform:rotate(-45deg);
    }

    /* Uses the :target pseudo-class to perform the animations upon clicking the .lightbox-target anchor */

    .lightbox-target:target {
        opacity: 1;
        top: 0;
        bottom: 0;
    }

    .lightbox-target:target img {
        max-height: 100%;
        max-width: 100%;
    }

    .lightbox-target:target a.lightbox-close {
        top: 0px;
    }
</style>