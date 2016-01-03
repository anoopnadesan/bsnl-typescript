var app;
(function (app) {
    var login;
    (function (login) {
        'use strict';
        var LoginService = (function () {
            function LoginService($timeout, $rootScope, $cookies, $location) {
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
                this.$location = $location;
            }
            LoginService.prototype.Login = function (username, password, callback) {
                this.$timeout(function () {
                    var response = { success: username === 'demo' && password === 'demo', message: "" };
                    if (!response.success) {
                        response.message = 'Username or password is incorrect';
                    }
                    callback(response);
                }, 1000);
            };
            LoginService.prototype.setCredentialsin = function (username, password) {
                this.$rootScope.userdata = username + "|" + password;
                this.$cookies["userdata"] = this.$rootScope.userdata;
            };
            LoginService.prototype.ClearCredentials = function () {
                this.$rootScope.userdata = "";
                this.$cookies["userdata"] = "";
            };
            LoginService.prototype.authenticate = function () {
                this.$rootScope.userdata = this.$cookies['userdata'];
                // redirect to login page if not logged in
                if (this.$location.path() !== '/login' && !this.$rootScope.userdata) {
                    this.$location.path("/login");
                }
            };
            LoginService.$inject = [
                '$timeout',
                '$rootScope',
                '$cookies',
                '$location'
            ];
            return LoginService;
        })();
        login.LoginService = LoginService;
        angular
            .module('app.login')
            .service('app.login.LoginService', LoginService);
    })(login = app.login || (app.login = {}));
})(app || (app = {}));
