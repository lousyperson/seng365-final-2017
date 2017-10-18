<template>
    <div id="app">
        <br /><br />
        <div class="row">
            <div class="col">
                <h1 :style="{'text-align': 'center'}">Projects Backed</h1>
            </div>
        </div>
        <input type="text" id="filterInput" v-on:keyup="filterFunction" placeholder="Filter project..." />
        <br /><br />
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-on:click="updateIndex(-1)">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="i in range(projectsArrayLen)" v-on:click="updateIndex(null, i)" :id="i"><a class="page-link" :href="'#'">{{ i+1 }}</a></li>
                <li class="page-item" v-on:click="updateIndex(1)">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div class="container">
            <div id="projects" class="row">
                <div class="col-lg-4" v-for="project in projectsArray[projectsIndex]" :projectsArray="projectsArray">
                    <div class="card">
                        <div class="projectsRow" :title="getProjectTitle(project.title + ' ' + project.subtitle)">
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

        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-on:click="updateIndex(-1)">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="i in range(projectsArrayLen)" v-on:click="updateIndex(null, i)" :id="i"><a class="page-link" :href="'#'">{{ i+1 }}</a></li>
                <li class="page-item" v-on:click="updateIndex(1)">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import Vue from "../main.js";
    import _ from 'underscore';

    export default {
        component: {
            Vue
        },
        data() {
            return {
                error: "",
                errorFlag: false,
                projects: [],
                projectId: 0,
                pageTitle: 'Projects',
                projectsArray: [],
                projectsArrayLen: 0,
                projectsIndex: 0
            }
        },
        beforeCreate() {
            this.session = this.$session ? this.$session.exists() : null;
            if (!this.session) {
                this.$router.push('/');
                this.$router.go(0);
            }
        },
        created() {
            this.getProjects();
        },
        methods: {
            getProjects: function () {
                this.$http.get('http://localhost:4941/api/v2/projects?backer=' + this.$session.get('id'))
                    .then(function (response) {
                        this.projects = response.data;
                        this.splitArray();
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    })
            },

            splitArray: function (newArray) {
                let group = 6;
                if (!newArray) {
                    newArray = this.projects;
                }

                this.projectsArray = _.chain(newArray).groupBy(function(element, index){
                    return Math.floor(index/group);
                }).toArray().value();

                this.projectsArrayLen = this.projectsArray.length;
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
                let input, filter;
                input = document.getElementById('filterInput');
                filter = input.value.toUpperCase();
                if (filter.length > 0) {
                    let tempArray = [];
                    this.projects.forEach((value, index, listObj) => {
                        let title = value.title.toUpperCase();
                        let subtitle = value.subtitle.toUpperCase();
                        if (title.indexOf(filter) >= 0 || subtitle.indexOf(filter) >= 0) {
                            tempArray.push(value);
                        }
                    });
                    this.projectsArray = [];
                    this.projectsArray.push(tempArray);
                    this.projectsIndex = 0;
                    this.projectsArrayLen = this.projectsArray.length;
                    this.splitArray(tempArray)
                } else {
                    this.splitArray();
                }
            },

            range: function (start, stop, step) {
                if (typeof stop === 'undefined') {
                    // one param defined
                    stop = start;
                    start = 0;
                }
                if (typeof step === 'undefined') {
                    step = 1;
                }
                if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
                    return [];
                }
                let result = [];
                for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
                    result.push(i);
                }
                return result;
            },

            updateIndex: function (increment, value) {
                if (increment === null && value >= 0) {
                    this.projectsIndex = value;
                } else {
                    let newVal = this.projectsIndex + increment;
                    newVal = newVal > 0 ? newVal : 0;
                    this.projectsIndex = newVal < this.projectsArrayLen ? newVal : newVal - 1;
                }

                $('.pagination').children().removeClass('active');
                $('#'+this.projectsIndex).addClass('active');
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