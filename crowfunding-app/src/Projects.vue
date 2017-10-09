<template>
    <div>
        <h1>Projects</h1>

        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.projectId">
            <div id="project">
                <router-link :to="{ name: 'projects' }">Back to Projects</router-link>

                <br /><br />

                <table>
                    <tr>
                        <td>Project ID</td>
                        <td>Title</td>
                        <td>Subtitle</td>
                        <td>Image</td>
                    </tr>
                    <tr>
                        <td>{{ $route.params.projectId }}</td>
                        <td>{{ getSingleProject($route.params.projectId).title }}</td>
                        <td>{{ getSingleProject($route.params.projectId).subtitle }}</td>
                        <td><img :src="getImage($route.params.projectId)" height="50%" width="50%" /></td>
                    </tr>
                </table>
            </div>
        </div>

        <div v-else>
            <div id="projects">
                <table>
                    <tr v-for="project in projects">
                        <td>{{ project.title }}</td>
                        <td><router-link :to="{ name: 'project', params: { projectId: project.id }}">View</router-link></td>
                    </tr>
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
                projectId: 0
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
            }
        }
    }
</script>