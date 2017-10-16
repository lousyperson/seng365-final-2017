<template>
    <div class="container">
        <router-link :to="{ name: 'projects' }">
            <p :style="{ 'text-align': 'left !important' }">← Back to Projects</p>
        </router-link>

        <h1>{{ project.title }}</h1>
        <br /><br />

        <div class="row">
            <div class="col align-self-center">
                <img :src="getImage($route.params.projectId)" />
            </div>
            <div class="col align-self-center">
                <h4>" {{ project.subtitle }} "</h4>
                <br />
                <p>
                    Created by:<br />
                    {{ creators.toString() }}
                </p>
                <p>
                    On:<br/>
                    {{ creationDateString }}
                </p>
            </div>
        </div>
        <br /><br />

        <h4>Current Pledge:</h4>
        <div class="progress">
            <div class="progress-bar progress-bar-striped" role="progressbar" :style="{ width: progressbarPercent, height: '40px' }">
                <span>
                    {{ project.progress.currentPledged.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }} of {{ project.target.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}
                </span>
            </div>
        </div>
        <br />
        <div>
            By <a v-on:click="showBackers">{{ project.progress.numberOfBackers }}</a> backer!
        </div>
        <br /><br />

        <div id="project">
            <div class="container">
                <!--Description-->
                <div class="row">
                    <div class="col">
                        <h4>Description</h4>
                        <br />
                        <p v-for="line in project.description.split(/(?:\r\n|\r|\n)/g)" :style="{ 'text-align': 'justify' }">{{ line }}</p>
                    </div>

                    <!--Rewards-->
                    <div class="col">
                        <h4>Rewards</h4>
                        <br />
                        <div class="row" v-for="reward in project.rewards">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">At {{ reward.amount.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</h5>
                                        <p :style="{ 'text-align': 'justify' }">{{ reward.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                projectId: 0,
                project: [],
                progressbarPercent: 0,
                creators: '',
                creationDateString: ''
            }
        },
        mounted: function () {

        },
        beforeCreate() {
            this.$http.get('http://localhost:4941/api/v2/projects/' + this.$route.params.projectId)
                .then(function (response) {
                    this.project = response.data;
                    this.progressbarPercent = this.project.progress.currentPledged * 100 / this.project.target;

                    this.project.creators.forEach((value, index, listObj) => {
                        if (index === 0) {
                            this.creators += value.username;
                        } else {
                            this.creators += ', ' + value.username;
                        }
                    });

                    this.creationDateString = moment(this.project.creationDate).format('MMMM Do YYYY')
                }, function (error) {
                    this.error = error;
                    this.errorFlag = true;
                })
        },
        methods: {
            getImage: function (id) {
                return 'http://localhost:4941/api/v2/projects/' + id + '/image'
            },
            showBackers: function () {
                alert();
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