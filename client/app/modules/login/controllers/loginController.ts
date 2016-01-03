module app.login {
    'use strict';

    interface ILoginScope {
        username: ICredentials;
        password: ICredentials;
        error: string;
        login: () => void;
    }
    
    class LoginController implements ILoginScope {
        username: ICredentials;
        password: ICredentials;
        error: string;

        static $inject = [
            'app.login.LoginService',
            '$location',
            '$rootScope'
        ];
        constructor(
            private LoginService: app.login.LoginService,
            private $location:ng.ILocationService,
            private $rootScope:IAppRootScope) {
                $rootScope.dataLoaded = true;
                // reset login status
                LoginService.ClearCredentials();
        }

        login(): void {
            this.$rootScope.signingOn = true;
            this.LoginService.Login(this.username, this.password, (response) => {
                if(response.success) {
                    this.LoginService.setCredentialsin(this.username, this.password);
                    this.$location.path('/events');
                } else {
                    this.error = response.message;
                    this.$rootScope.signingOn = false;
                }
            });
        }
    }

    angular
        .module('app.login')
        .controller('LoginController',
        LoginController);
}