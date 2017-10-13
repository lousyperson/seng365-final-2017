<template>
    <div>
        <h1>{{ project.title }}</h1>
        <img :src="getImage($route.params.projectId)" height="300" />

        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div id="project">
            <router-link :to="{ name: 'projects' }">Back to Projects</router-link>
            <br /><br />

            <table>
                <tr>
                    <td class="tableHeader">Subtitle</td>
                    <td>{{ project.subtitle }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Description</td>
                    <td>{{ project.description }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Creation date</td>
                    <td>{{ (new Date(project.creationDate)).toString() }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Creators</td>
                    <td v-for="creator in project.creators">{{ creator.username }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Rewards</td>
                    <td>
                        <table v-for="reward in project.rewards">
                            <tr>
                                <td class="tableHeader">Amount</td>
                                <td>{{ reward.amount.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</td>
                            </tr>
                            <tr>
                                <td class="tableHeader">Description</td>
                                <td>{{ reward.description }}</td>
                            </tr>
                            <br />
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="tableHeader">Funding target</td>
                    <td>{{ project.target.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</td>
                </tr>
            </table>
            <br /><br />

            <table>
                <tr>
                    <td class="tableHeader">Current Pledged</td>
                    <td>{{ project.progress.currentPledged.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Number of Backers</td>
                    <td>{{ project.progress.numberOfBackers }}</td>
                </tr>
                <tr>
                    <td class="tableHeader">Backers</td>
                    <td>
                        <table v-for="backer in project.backers">
                            <tr>
                                <td class="tableHeader">User</td>
                                <td>{{ backer.username }}</td>
                            </tr>
                            <tr>
                                <td class="tableHeader">Amount</td>
                                <td>{{ backer.amount }}</td>
                            </tr>
                            <br />
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                projectId: 0,
                project: []
            }
        },
        mounted: function () {

        },
        created() {
            this.getProject();
        },
        methods: {
            getProject: function () {
                this.$http.get('http://localhost:4941/api/v2/projects/' + this.$route.params.projectId)
                    .then(function (response) {
                        this.project = response.data;
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    })
            },

            getImage: function (id) {
                return 'http://localhost:4941/api/v2/projects/' + id + '/image'
            }
        }
    }
</script>

<style>
    .tableHeader {
        font-weight: bold;
        background-color: #3fa338;
        color: #FFFFFF;
    }
</style>