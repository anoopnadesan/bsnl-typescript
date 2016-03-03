module app.login {
    'use strict';
    
    export interface IAppCookies extends ng.cookies.ICookiesService {
        userdata: any;
    }
    
    export interface IAppRootScope extends ng.IRootScopeService {
        userdata: any;
        dataLoaded: boolean;
        signingOn: boolean;
        currentMenuItem: string;
        jumbotron: string;
    }

    export interface ICredentials {
        username: string;
        password: string;
    }

    export interface ILogin {
        Login(username:ICredentials, password:ICredentials, callback:Function): void;
        setCredentialsin(username:ICredentials, password:ICredentials): void;
        ClearCredentials(): void;
        authenticate(): void;
    }
    
    export class LoginService implements ILogin {
        static $inject = [
            '$timeout',
            '$rootScope',
            '$cookies',
            '$location'
        ];
        constructor(
            private $timeout: ng.ITimeoutService,
            private $rootScope: IAppRootScope,
            private $cookies: IAppCookies,
            private $location: ng.ILocationService) {
        }

        Login(username, password, callback:Function): void {
            this.$timeout((): void => {
                var response = { success: username === 'demo' && password === 'demo', message: "" };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);
        }
        
        setCredentialsin(username:ICredentials, password:ICredentials): void {
            this.$rootScope.userdata = username+"|"+password;
            this.$cookies["userdata"] = this.$rootScope.userdata;
        }
        
        ClearCredentials(): void {
            this.$rootScope.userdata = "";
            this.$cookies["userdata"] = "";
        }
        
        authenticate(): void {
            this.$rootScope.userdata = this.$cookies['userdata'];
            // redirect to login page if not logged in
            if (this.$location.path() !== '/login' && !this.$rootScope.userdata) {
                this.$location.path("/login");
            }
        }
    }

    angular
        .module('app.login')
        .service('app.login.LoginService', LoginService);
}