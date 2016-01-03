(function () {
    'strict';
    angular
        .module('app', [
        /*
        * Angular Modules
        */
        'ngRoute',
        'ngCookies',
        /*
         * Site modules
         */
        'app.login',
        'app.common',
        'app.events',
        'app.directory'
    ])
        .config(config)
        .run(run);
    config.$inject = [
        '$locationProvider'
    ];
    function config($locationProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }
    run.$inject = ['app.login.LoginService'];
    function run(LoginService) {
        // keep user logged in after page refresh
        LoginService.authenticate();
    }
})();
