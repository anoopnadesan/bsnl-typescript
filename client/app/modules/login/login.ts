((): void => {
    'use strict';  
    angular
        .module('app.login', [])
        .config(loginConfig);

    loginConfig.$inject = [
        '$routeProvider'
    ];
    
    function loginConfig(
        $routeProvider: ng.route.IRouteProvider): void {
            $routeProvider.
                when('/login', {
                    controller: 'LoginController as vm',
                    templateUrl: 'app/modules/login/templates/loginView.html'
                });
    }
})();