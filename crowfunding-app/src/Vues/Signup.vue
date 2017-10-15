<template>
    <div id="app">
        <h1>Register</h1>
        <br /><br />

        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="home" aria-expanded="true">Log in</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register">Register</a>
            </li>
        </ul>
        <br />

        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                <form>
                    <div>
                        <div class="form-group row" id="loginFormEmail">
                            <label for="loginEmail" class="col-sm-2 col-form-label">Email address</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="loginEmail" aria-describedby="loginEmail" placeholder="Enter email" />
                            </div>
                        </div>
                        <div class="form-group row" id="loginFormUsername" style="display: none">
                            <label for="loginUsername" class="col-sm-2 col-form-label">Username</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="loginUsername" aria-describedby="loginUsername" placeholder="Enter username" />
                            </div>
                        </div>
                        <div class="form-check form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="emailRadio" value="email" checked> Email
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="usernameRadio" value="username"> Username
                            </label>
                        </div>
                        <div class="form-group row">
                            <label for="loginPassword" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="loginPassword" placeholder="Password"/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                <form>
                    <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email address</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputUsername" placeholder="Username"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputLocation" class="col-sm-2 col-form-label">Location (Optional)</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputLocation" placeholder="Location (Optional)"/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
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
                session: null
            }
        },
        beforeCreate() {
            this.session = this.$session ? this.$session.exists() : null;
            if (this.session) {
                this.$router.go(-1);
            }
        }
    }

    $(document).ready(function() {
        $("input[name$='inlineRadioOptions']").click(function() {
            let test = $(this).val();
            if (test === 'email') {
                $('#loginFormEmail').css("display", "");
                $('#loginFormUsername').css("display", "none");
            } else if (test === 'username') {
                $('#loginFormUsername').css("display", "");
                $('#loginFormEmail').css("display", "none");
            }
        });
    });
</script>