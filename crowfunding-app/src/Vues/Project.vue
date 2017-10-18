<template>
    <div class="container">
        <router-link :to="{ name: 'projects' }">
            <p :style="{ 'text-align': 'left !important' }">← Back to Projects</p>
        </router-link>

        <h1>{{ project.title }}</h1>
        <br /><br />

        <div class="row">
            <div class="col align-self-center">
                <img :src="getImage($route.params.projectId)" style="max-width:640px;width: 100%;"/>
            </div>
            <div class="col align-self-center">
                <h4><i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;&nbsp;{{ project.subtitle }}&nbsp;&nbsp;<i class="fa fa-quote-right" aria-hidden="true"></i></h4>
                <br />
                <p>
                    Created by:<br />
                    {{ creators.toString() }}
                </p>
                <p>
                    On:<br/>
                    {{ creationDateString }}
                </p>
                <br />
                <p v-show="isCreator()">
                    <label><b>Creator panel:</b></label>
                    <br />
                    <label>Project open status: {{ project.open }}</label>
                    <br />
                    <button class="btn btn-danger" v-on:click="closeProj" v-show="project.open">Close Project</button>
                </p>
            </div>
        </div>
        <br /><br />

        <h4>Target goal progress by <a v-on:click="showBackers" href="#">{{ project.progress.numberOfBackers }} backer(s):</a></h4>
        <div class="progress row">
            <div class="progress-bar progress-bar-striped" role="progressbar" :style="{ width: progressbarPercent + '%' }">
                <label>{{ (project.progress.currentPledged / project.target * 100).toFixed(2) }} %</label>
            </div>
        </div>
        <br />
        <span>{{ project.progress.currentPledged.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }} of {{ project.target.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</span>
        <br /><br />
        <button class="btn btn-primary" data-toggle="modal" data-target="#pledgeModal">
            Pledge this project!
        </button>
        <br /><br /><br />

        <!-- The backer modal -->
        <div class="modal fade" id="backerModal" tabindex="-1" role="dialog" aria-labelledby="modalLabelLarge" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Backers</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <h4>Top 5 backers</h4>
                                <br />
                                <p v-for="([name, amount], pos) in topBackersArray" style="text-align: left;"><b>{{ pos + 1}}. {{ name }}:</b> {{ amount.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}</p>
                            </div>
                            <div class="col">
                                <h4>Recent 5 backers</h4>
                                <br />
                                <p v-for="line in recentBackersArray" style="text-align: left;">
                                    <b>{{ line.username }}</b>: {{ line.amount.toLocaleString(undefined, {style: "currency", currency: "NZD"}) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- The pledge modal -->
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
                                    <input class="form-check-input" type="checkbox" id="anonCheckbox" name="anonCheckbox" value="anon">
                                </label>
                            </div>

                            <!--Credit Card Number-->
                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8 form-group has-danger">
                                    <label for="pledgeCard" class="sr-only">Credit card number</label>
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6em"><i class="fa fa-credit-card-alt"></i></div>
                                        <input v-model="pledgeCard" v-validate="'required|credit_card|min:16'" type="text"
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
                                        <input v-model="pledgeCVV" v-validate="'required|numeric|min:3'" type="text"
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
    import Vue from "../main.js";

    export default {
        component: {
            Vue
        },
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
                pledgeError: '',
                topBackersArray: [],
                recentBackersArray: []
            }
        },
        mounted: function () {

        },
        beforeCreate() {
            this.$http.get('http://localhost:4941/api/v2/projects/' + this.$route.params.projectId)
                .then(function (response) {
                    this.project = response.data;
                    let calcPercent = this.project.progress.currentPledged * 100 / this.project.target
                    this.progressbarPercent = calcPercent > 100 ? 100 : calcPercent;

                    this.project.creators.forEach((value, index, listObj) => {
                        if (index === 0) {
                            this.creators += value.username;
                        } else {
                            this.creators += ', ' + value.username;
                        }
                    });

                    let tempBackersSum = {};
                    this.project.backers.forEach((value, index, listObj) => {
                        if (index < 5) {
                            let pos = index + 1;
                            this.recentBackersArray.push({
                                username: pos + '. ' + value.username,
                                amount: value.amount
                            });
                        }
                        let tempName = value.username;
                        if (tempBackersSum[tempName]) {
                            tempBackersSum[tempName] += value.amount;
                        } else {
                            tempBackersSum[tempName] = value.amount;
                        }
                    });
                    let items = Object.keys(tempBackersSum).map(function(key) {
                        return [key, tempBackersSum[key]];
                    });

                    items.sort(function(first, second) {
                        return second[1] - first[1];
                    });

                    this.topBackersArray = items.slice(0, 5);

                    this.creationDateString = moment(this.project.creationDate).format('MMMM Do YYYY');
                }, function (error) {
                    this.error = error;
                    this.errorFlag = true;
                })
        },
        created() {

        },
        methods: {
            isCreator: function () {
                let isCreator = false;
                this.project.creators.forEach((value, index, list) => {
                    if (this.$session.exists()) {
                        if (value.id === this.$session.get('id')) {
                            isCreator = true;
                        }
                    }
                });
                return isCreator;
            },
            getImage: function (id) {
                return 'http://localhost:4941/api/v2/projects/' + id + '/image'
            },
            showBackers: function () {
                $('#backerModal').modal('show');
            },
            checkPledgeDetails: function () {
                this.pledgeErrorFlag = false;

                let anonCheckbox = $("input[name='anonCheckbox']:checked").val() === 'anon';

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let payload = {
                            "id": this.$session.get('id'),
                            "amount": Number(this.pledgeAmount),
                            "anonymous": anonCheckbox,
                            "card": {
                                "authToken": this.pledgeCard.toString()
                            }
                        };

                        this.$http.post('http://localhost:4941/api/v2/projects/' + this.project.id + '/pledge', payload, {
                            headers: {'X-Authorization': this.$session.get('token')}
                        }).then(response => {
                            if (response.status === 201) {
                                this.$router.go(0);
                            } else {
                                this.pledgeError = "Pledge failed.";
                                this.pledgeErrorFlag = true;
                            }
                        }, response => {
                            if (response.status === 403) {
                                this.pledgeError = "You are the owner of project.";
                                this.pledgeErrorFlag = true;
                            } else {
                                this.pledgeError = "Pledge failed.";
                                this.pledgeErrorFlag = true;
                            }
                        });
                    } else {
                        this.pledgeError = "Please correct your details.";
                        this.pledgeErrorFlag = true;
                    }
                })
            },
            closeProj: function () {
                this.$http.put('http://localhost:4941/api/v2/projects/' + this.project.id, { "open": false }, {
                    headers: {'X-Authorization': this.$session.get('token')}
                }).then(response => {
                    if (response.status === 201) {
                        this.$router.go(0);
                    } else {
                        alert("Project close failed");
                    }
                }, response => {
                    alert("Project close failed");
                });
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

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    }

    /*input[type="number"]::-webkit-outer-spin-button,*/
    /*input[type="number"]::-webkit-inner-spin-button {*/
        /*-webkit-appearance: none;*/
        /*margin: 0;*/
    /*}*/
    input[type="number"] {
        -moz-appearance: textfield;
    }

    .progress-bar {
        height: 40px;
        font-size: 30px;
        line-height: 40px;
    }
</style>