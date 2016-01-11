((): void => {
    'use strict';
    angular
        .module('app.common', [])
        .config(commonConfig);

    commonConfig.$inject = [
        '$routeProvider'
    ];

    function commonConfig(
        $routeProvider: ng.route.IRouteProvider): void {
            $routeProvider.
                otherwise({
                    redirectTo: '/events'
                });
    }
})();