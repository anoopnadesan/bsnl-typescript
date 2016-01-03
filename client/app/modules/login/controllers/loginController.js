var app;
(function (app) {
    var login;
    (function (login) {
        'use strict';
        var LoginController = (function () {
            function LoginController(LoginService, $location, $rootScope) {
                this.LoginService = LoginService;
                this.$location = $location;
                this.$rootScope = $rootScope;
                $rootScope.dataLoaded = true;
                // reset login status
                LoginService.ClearCredentials();
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.$rootScope.signingOn = true;
                this.LoginService.Login(this.username, this.password, function (response) {
                    if (response.success) {
                        _this.LoginService.setCredentialsin(_this.username, _this.password);
                        _this.$location.path('/events');
                    }
                    else {
                        _this.error = response.message;
                        _this.$rootScope.signingOn = false;
                    }
                });
            };
            LoginController.$inject = [
                'app.login.LoginService',
                '$location',
                '$rootScope'
            ];
            return LoginController;
        })();
        angular
            .module('app.login')
            .controller('LoginController', LoginController);
    })(login = app.login || (app.login = {}));
})(app || (app = {}));
