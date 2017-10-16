<template>
    <div id="app">
        <div id="loginform" class="main-login main-center">
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab"
                       aria-controls="home" aria-expanded="true">Log in</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab"
                       aria-controls="register">Register</a>
                </li>
            </ul>
            <br/>

            <div class="tab-content" id="myTabContent">
                <!--Login Tab-->
                <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <form @submit.prevent="checkLogin">
                        <!--Username-->
                        <div class="row" id="loginFormUsername">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="loginUsername" class="sr-only">Username</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                                    <input v-model="loginUsername" v-validate="'required|alpha_dash'" name="loginUsername"
                                           type="text" :class="{ 'form-control': true, 'input': true}"
                                           id="loginUsername" placeholder="Enter username"/>
                                </div>
                            </div>
                        </div>
                        <!--Email-->
                        <div class="row" id="loginFormEmail" style="display: none">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="loginEmail" class="sr-only">Email address</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-envelope"></i></div>
                                    <input v-model="loginEmail" v-validate="'required|email'" name="loginEmail" type="text"
                                           :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('email')}"
                                           id="loginEmail" placeholder="Enter email"/>
                                </div>
                            </div>
                        </div>
                        Log in with:
                        <div class="form-check form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="usernameRadio" value="username" checked> Username
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="emailRadio"
                                       value="email"> Email
                            </label>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="loginPassword" class="sr-only">Password</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-lock"></i></div>
                                    <input v-model="loginPassword" v-validate="'required|alpha_num'" name="loginPassword"
                                           type="password" :class="{ 'form-control': true, 'input': true}"
                                           id="loginPassword" placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Log in</button>
                        <br/><br/>
                        <span v-show="loginErrorFlag" class="text-danger">{{ loginError }}</span>
                    </form>
                </div>

                <!--Register Tab-->
                <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                    <form @submit.prevent="validateBeforeSubmit">
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="inputEmail" class="sr-only">Email address</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-envelope"></i></div>
                                    <input v-model="registerEmail" type="text"
                                           :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('email')}"
                                           id="inputEmail" placeholder="Enter email"/>
                                    <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="inputUsername" class="sr-only">Username</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
                                    <input v-model="registerUsername" type="text"
                                           :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('alpha_dash')}"
                                           id="inputUsername" placeholder="Username"/>
                                    <span v-show="errors.has('alpha_dash')" class="text-danger">{{ errors.first('alpha_dash') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="inputPassword" class="sr-only">Password</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-lock"></i></div>
                                    <input v-model="registerPassword" type="password"
                                           :class="{ 'form-control': true, 'input': true, 'has-danger': errors.has('alpha_num')}"
                                           id="inputPassword" placeholder="Password"/>
                                </div>
                            </div>
                            <span v-show="errors.has('alpha_dash')" class="text-danger">{{ errors.first('alpha_num') }}</span>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6 form-group has-danger">
                                <label for="inputLocation" class="sr-only">Location (Optional)</label>
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-location-arrow"></i></div>
                                    <input v-model="registerLocation" type="text" class="form-control" id="inputLocation"
                                           placeholder="Location (Optional)"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <br/><br/>
                        <span v-show="errorFlag" class="text-danger">{{ error }}</span>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "../main.js";

    export default {
        component: {
            Vue
        },
        data() {
            return {
                error: "",
                errorFlag: false,
                session: null,
                registerEmail: '',
                registerUsername: '',
                registerPassword: '',
                registerLocation: '',
                loginEmail: '',
                loginUsername: '',
                loginPassword: '',
                loginError: '',
                loginErrorFlag: false
            }
        },
        beforeCreate() {
            this.session = this.$session ? this.$session.exists() : null;
            if (this.session) {
                this.$router.push('/');
                this.$router.go(0);
            }
        },
        created() {
            this.$validator.attach('registerEmail', 'required|email');
            this.$validator.attach('registerUsername', 'required|alpha_dash');
            this.$validator.attach('registerPassword', 'required|alpha_num');
        },
        methods: {
            validateBeforeSubmit: function () {
                this.errorFlag = false;
                this.$validator.validateAll({
                    registerEmail: this.registerEmail,
                    registerUsername: this.registerUsername,
                    registerPassword: this.registerPassword
                }).then((result) => {
                    if (result) {
                        if (this.registerEmail.length > 0 && this.registerUsername.length > 0 && this.registerPassword.length > 0) {
                            this.register();
                        }
                    } else {
                        this.error = "Please correct your details.";
                        this.errorFlag = true;
                    }
                });
            },
            checkLogin: function () {
                this.loginErrorFlag = false;
                let loginRadioChecked = $("input[name='inlineRadioOptions']:checked").val();

                if (loginRadioChecked === "email") {
                    this.$validator.validateAll({
                        loginEmail: this.loginEmail,
                        loginPassword: this.loginPassword
                    }).then((result) => {
                        if (result) {
                            this.login(this.loginEmail, null, this.loginPassword);
                        } else {
                            this.loginError = "Please check log in email details.";
                            this.loginErrorFlag = true;
                        }
                    });
                } else if (loginRadioChecked === "username") {
                    this.$validator.validateAll({
                        loginUsername: this.loginUsername,
                        loginPassword: this.loginPassword
                    }).then((result) => {
                        if (result) {
                            this.login(null, this.loginUsername, this.loginPassword);
                        } else {
                            this.loginError = "Please check log in username details.";
                            this.loginErrorFlag = true;
                        }
                    });
                }
            },
            register: function () {
                let payload = {
                    "username": this.registerUsername,
                    "email": this.registerEmail,
                    "password": this.registerPassword,
                    "location": this.registerLocation
                };

                this.$http.post('http://localhost:4941/api/v2/users', payload).then(function (response) {
                    if (response.status === 201) {
                        this.login(null, this.registerUsername, this.registerPassword);
                    }
                }, function (error) {
                    console.log(error)
                })
            },
            login: function (email, username, password) {
                let URI = require('urijs');
                let url = new URI('http://localhost:4941/api/v2/users/login');

                if (email && !username) {
                    url.addQuery("email", email);
                } else if (username && !email) {
                    url.addQuery("username", username);
                }
                url.addQuery("password", password);

                this.$http.post(url.toString()).then(function (response) {
                    if (response.status === 200) {
                        this.$session.start();
                        this.$session.set('id', response.data.id);
                        this.$session.set('token', response.data.token);
                        this.$router.push('/');
                        this.$router.go(0);
                    }
                }, function (error) {
                    console.log(error);
                })
            }
        }
    }

    $(document).ready(function () {
        $("input[name$='inlineRadioOptions']").click(function () {
            let test = $(this).val();
            if (test === 'email') {
                $('#loginFormEmail').css("display", "");
                $('#loginFormUsername').css("display", "none");
            } else if (test === 'username') {
                $('#loginFormUsername').css("display", "");
                $('#loginFormEmail').css("display", "none");
            }
        });

        $("")
    });
</script>

<style>
    .main-login{
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