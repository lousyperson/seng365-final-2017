<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.projectId">
            <h1>{{ getSingleProject($route.params.projectId).title }}</h1>
            <img :src="getImage($route.params.projectId)" height="300" />

            <div id="project">
                <router-link :to="{ name: 'projects' }">Back to Projects</router-link>

                <br /><br />

                <table>
                    <thead>
                        <tr>
                            <td>Project ID</td>
                            <td>Subtitle</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $route.params.projectId }}</td>
                            <td>{{ getSingleProject($route.params.projectId).subtitle }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else>
            <h1>{{ pageTitle }}</h1>
            <input type="text" id="filterInput" v-on:keyup="filterFunction" placeholder="Filter project..." />

            <div id="projects">
                <table>
                    <!--TODO Check closed projects-->
                    <template v-for="project in projects">
                        <tr v-if="project.open === true" class="projectsRow" :title="getProjectTitle(project.title)">
                            <td>{{ project.title }}</td>
                            <td><router-link :to="{ name: 'project', params: { projectId: project.id }}">View</router-link></td>
                            <td><img :src="getImage(project.id)" height="100" /></td>
                        </tr>
                    </template>
                </table>
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

            getSingleProject: function (id) {
                for (let i = 0; i <= this.projects.length; i++) {
                    if (this.projects[i].id == id) {
                        return this.projects[i];
                    }
                }
            },

            getImage: function (id) {
                return 'http://localhost:4941/api/v2/projects/' + id + '/image'
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
            }
        }
    }
</script>