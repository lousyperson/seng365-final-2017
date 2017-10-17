<template>
    <div id="app">
        <h1>Profile</h1>
        <br /><br />
        <button class="btn btn-primary" v-on:click="getProfile">Get Profile</button>
        <br /><br />

        <div v-show="profile">
            <p><b>Profile ID:</b> {{ profileId }}</p>
            <p><b>Profile Username:</b> {{ profileUsername }}</p>
            <p><b>Profile Location:</b> {{ profileLocation }}</p>
            <p><b>Profile Email:</b> {{ profileEmail }}</p>
            <p><b>Profile Token:</b> {{ authToken }}</p>
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
                session: null,
                profile: false,
                profileId: 0,
                profileUsername: '',
                profileLocation: '-',
                profileEmail: '',
                authToken: ''
            }
        },
        beforeCreate() {
            this.session = this.$session ? this.$session.exists() : null;
            if (!this.session) {
                this.$router.push('/');
                this.$router.go(0);
            }
        },
        methods: {
            getProfile: function () {
//                alert(this.session);
//                alert(this.$session.get('id'));
                this.$http.get('http://localhost:4941/api/v2/users/' + this.$session.get('id'), {
                    headers: {'X-Authorization': this.$session.get('token')}
                }).then(response => {
                    this.profile = true;
                    this.profileId = response.data.id;
                    this.profileUsername = response.data.username;
                    this.profileLocation = response.data.location.length > 0 ? response.data.location : '-';
                    this.profileEmail = response.data.email;
                    this.authToken = this.$session.get('token');
                }, response => {
                    // error handing
                });
            }
        }
    }
</script>

<style>

</style>