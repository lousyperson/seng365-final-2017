<template>
    <div id="app">
        <div id="createform" class="main-create main-center">
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="login-tab" data-toggle="tab" href="#create" role="tab"
                       aria-controls="home" aria-expanded="true">Create Project</a>
                </li>
            </ul>
            <br/>
            <div class="row">
                <div class="col align-self-center">
                    <img id="projImg" src="#" height="200px" />
                </div>
            </div>
            <br/>

            <div class="tab-content" id="myTabContent">
                <!--Create Project Tab-->
                <div class="tab-pane fade show active" id="create" role="tabpanel" aria-labelledby="create-tab">
                    <form @submit.prevent="validateCreate">
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="projImgInput" class="sr-only">Project image</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <input v-on:change="readURL" type="file" name="filename" accept="image/jpeg, image/png" id="projImgInput">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="createTitle" class="sr-only">Project title</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <input v-model="createTitle" type="text"
                                           :class="{ 'form-control': true, 'input': true }"
                                           id="createTitle" placeholder="Project title"/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="createSubtitle" class="sr-only">Project subtitle</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <textarea v-model="createSubtitle"
                                           :class="{ 'form-control': true, 'input': true }"
                                           id="createSubtitle" placeholder="Project subtitle"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="createDescription" class="sr-only">Project description</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <textarea v-model="createDescription"
                                           :class="{ 'form-control': true, 'input': true }"
                                           id="createDescription" placeholder="Project description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="createTarget" class="sr-only">Project target (NZD$)</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-money"></i></div>
                                    <input v-model="createTarget" type="number" class="form-control" id="createTarget"
                                           placeholder="Project target (NZD$)"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Next to rewards →</button>
                        <br/><br/>
                        <span v-show="createErrorFlag" class="text-danger">{{ createError }}</span>
                    </form>
                </div>
            </div>

            <!--Rewards Tab-->
            <div class="tab-pane fade" id="reward" role="tabpanel" aria-labelledby="reward-tab" style="display: none">
                <form @submit.prevent="createProject">
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 form-group has-danger">
                            <label for="rewardAmount" class="sr-only">Reward target (NZD$)</label>
                            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-money"></i></div>
                                <input v-model="rewardAmount" type="number" class="form-control" id="rewardAmount"
                                       placeholder="Reward target (NZD$)"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 form-group has-danger">
                            <label for="rewardDescription" class="sr-only">Reward description</label>
                            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <textarea v-model="rewardDescription"
                                          :class="{ 'form-control': true, 'input': true }"
                                          id="rewardDescription" placeholder="Reward description"></textarea>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-secondary" v-on:click="validateReward">Add more rewards&nbsp;&nbsp;<i class="fa fa-plus"></i></button>
                    <br/><br/>
                    <button type="submit" class="btn btn-primary">&nbsp;&nbsp;&nbsp;&nbsp;Done and submit !&nbsp;&nbsp;&nbsp;&nbsp;</button>
                    <br/><br/>
                    <span v-show="rewardErrorFlag" class="text-danger">{{ rewardError }}</span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "../main.js";
    import PictureInput from 'vue-picture-input';

    export default {
        component: {
            Vue,
            PictureInput
        },
        data() {
            return {
                session: null,
                createTitle: '',
                createSubtitle: '',
                createDescription: '',
                createTarget: null,
                createCreators: '',
                createRewards: [],
                createError: '',
                createErrorFlag: false,
                rewardAmount: null,
                rewardDescription: '',
                rewardError: '',
                rewardErrorFlag: false,
                projImg: null
            }
        },
        created() {
            this.$validator.attach('createRequired', 'required');
            this.$validator.attach('min_one', 'required|min_value:1');
        },
        methods: {
            validateCreate: function () {
                this.createErrorFlag = false;
                this.$validator.validateAll({
                    'createRequired': this.createTitle,
                    'createRequired': this.createSubtitle,
                    'createRequired': this.createDescription,
                    'min_one': this.createTarget
                }).then((result) => {
                    if (result) {
                        $('#create').removeClass('show active');
                        $('#reward').addClass('show active');
                        $('#reward').css('display', '');
                    } else {
                        this.createError = 'Please correct the form';
                        this.createErrorFlag = true;
                    }
                }, (result) => {
                    this.createError = 'Please correct the form';
                    this.createErrorFlag = true;
                })
            },

            validateReward: function () {
                this.rewardErrorFlag = false;
                this.$validator.validateAll({
                    'min_one': this.rewardAmount,
                    'createRequired': this.rewardDescription
                }).then((result) => {
                    if (result) {
                        this.createRewards.push({
                            "amount": Number(this.rewardAmount),
                            "description": this.rewardDescription
                        });
                        this.rewardAmount = null;
                        this.rewardDescription = '';
                    } else {
                        this.rewardError = 'Please correct the form';
                        this.rewardErrorFlag = true;
                    }
                }, (result) => {
                    this.rewardError = 'Please correct the form';
                    this.rewardErrorFlag = true;
                });
                event.preventDefault();
            },

            createProject: function () {
                if (this.createRewards.length > 0) {
                    let payload = {
                        "title": this.createTitle,
                        "subtitle": this.createSubtitle,
                        "description": this.createDescription,
                        "target": Number(this.createTarget),
                        "creators": [
                            {
                                "id": this.$session.get('id')
                            }
                        ],
                        "rewards": this.createRewards
                    };

                    this.$http.post('http://localhost:4941/api/v2/projects', payload, {
                        headers: {'X-Authorization': this.$session.get('token')}
                    }).then(response => {
                        if (response.status === 201) {
                            if (this.projImg !== null) {
                                this.putImg(this.projImg, response.data.id, function () {
                                    Vue.$router.push('/projects');
                                    Vue.$router.go(0);
                                });
                            } else {
                                Vue.$router.push('/projects');
                                Vue.$router.go(0);
                            }
                        } else {
                            this.rewardError = 'Something went wrong when submitting';
                            this.rewardErrorFlag = true;
                        }
                    }, response => {
                        this.rewardError = 'Something went wrong when submitting';
                        this.rewardErrorFlag = true;
                    });
                } else {
                    event.preventDefault();
                    this.rewardError = 'Please add more reward';
                    this.rewardErrorFlag = true;
                }
            },

            readURL: function (input) {
                console.log(input);

                let projImg = input.srcElement;

                if (projImg.files && projImg.files[0]) {
                    this.projImg = projImg.files[0];
                    let reader = new FileReader();

                    reader.onload = function (e) {
                        $('#projImg').attr('src', e.target.result);
                    };

                    reader.readAsDataURL(projImg.files[0]);
                }
            },

            putImg: function (img, projId, res) {
                this.$http.put('http://localhost:4941/api/v2/projects/' + projId + '/image', img, {
                    headers: {
                        'X-Authorization': this.$session.get('token'),
                        'Content-Type': this.projImg.type
                    }
                }).then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        res();
                    } else {
                        event.preventDefault();
                        this.rewardError = 'Something went wrong with image';
                        this.rewardErrorFlag = true;
                        this.createError = 'Something went wrong with image';
                        this.createErrorFlag = true;
                    }
                }, response => {
                    event.preventDefault();
                    this.rewardError = 'Something went wrong with image';
                    this.rewardErrorFlag = true;
                    this.createError = 'Something went wrong with image';
                    this.createErrorFlag = true;
                });
            }
        }
    }
</script>

<style>
    .main-create{
        background-color: #F7F7F7;
        /* just in case there no content*/
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        /* shadows and rounded borders */
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .main-center{
        max-width: 700px;
        padding: 40px 40px;
    }
</style>