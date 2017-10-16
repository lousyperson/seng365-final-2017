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

        <h4>Target goal progress by <a v-on:click="showBackers">{{ project.progress.numberOfBackers }}</a> backers:</h4>
        <div class="progress row">
            <div class="progress-bar progress-bar-striped" role="progressbar" :style="{ width: progressbarPercent, height: '40px' }">
                <span>
                    {{ project.progress.currentPledged.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }} of {{ project.target.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}
                </span>
            </div>
        </div>
        <br />
        <button class="btn btn-primary" data-toggle="modal" data-target="#pledgeModal">
            Pledge this project!
        </button>
        <br /><br /><br />

        <!-- The modal -->
        <div class="modal fade" id="pledgeModal" tabindex="-1" role="dialog" aria-labelledby="modalLabelLarge" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Pledge details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="checkPledgeDetails">
                            <!--Pledge Amount-->
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 form-group has-danger">
                                    <label for="pledgeAmount" class="sr-only">Pledge Amount</label>
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6em"><i class="fa fa-money"></i></div>
                                        <input v-model="pledgeAmount" v-validate="'required|numeric|min_value:1'" type="number"
                                               :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('numeric') }"
                                               id="pledgeAmount" placeholder="Pledge amount"/>
                                    </div>
                                </div>
                            </div>

                            <!--Anonymous Checkbox-->
                            <div class="form-check">
                                Pledge anonymously:
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" id="anonCheckbox" value="anon">
                                </label>
                            </div>

                            <!--Credit Card Number-->
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8 form-group has-danger">
                                    <label for="pledgeCard" class="sr-only">Credit card number</label>
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6em"><i class="fa fa-credit-card-alt"></i></div>
                                        <input v-model="pledgeCard" v-validate="'required|credit_card|min:16'" type="number"
                                               :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('numeric') }"
                                               id="pledgeCard" placeholder="Credit card number"/>
                                    </div>
                                </div>
                            </div>

                            <!--Credit Card CVV-->
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 form-group has-danger">
                                    <label for="pledgeCVV" class="sr-only">CVV</label>
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6em"><i class="fa fa-credit-card-alt"></i></div>
                                        <input v-model="pledgeCVV" v-validate="'required|numeric|min:3'" type="number"
                                               :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('numeric') }"
                                               id="pledgeCVV" placeholder="CVV"/>
                                    </div>
                                </div>
                            </div>

                            <!--Credit Card Expiry-->
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 form-group has-danger">
                                    <label for="pledgeExpiry" class="sr-only">Expiry</label>
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6em"><i class="fa fa-credit-card-alt"></i></div>
                                        <input v-model="pledgeExpiry" v-validate="'required|date_format:MM/YY'" type="text"
                                               :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('numeric') }"
                                               id="pledgeExpiry" placeholder="Expiry (MM/YY)"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Pledge</button>
                            <br /><br />
                            <span v-show="pledgeErrorFlag" class="text-danger">{{ pledgeError }}</span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

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
                creationDateString: '',
                pledgeAmount: 10,
                pledgeCard: null,
                pledgeCVV: null,
                pledgeExpiry: null,
                pledgeErrorFlag: false,
                pledgeError: ''
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
        created() {

        },
        methods: {
            getImage: function (id) {
                return 'http://localhost:4941/api/v2/projects/' + id + '/image'
            },
            showBackers: function () {
                alert();
            },
            checkPledgeDetails: function () {
                this.pledgeErrorFlag = false;
                this.$validator.validateAll().then((result) => {
                    if (result) {

                    } else {
                        this.pledgeError = "Please correct your details.";
                        this.pledgeErrorFlag = true;
                    }
                })
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