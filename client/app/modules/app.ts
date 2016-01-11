((): void => {
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
        '$locationProvider',
        '$logProviderService'
    ];
    
    function config(
        $locationProvider: ng.ILocationProvider,
        $logProviderService: app.common.SocketService): void {
            // use the HTML5 History API
            $locationProvider.html5Mode(true);
    }
    
    run.$inject = ['app.login.LoginService'];

    function run(LoginService: app.login.LoginService): void {            
        // keep user logged in after page refresh
        LoginService.authenticate();
    }
})();