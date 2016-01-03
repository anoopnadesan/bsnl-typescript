((): void => {
    'use strict';
    angular
        .module('app.common', [])
        .config(commonConfig)/*
        .directive('app.common.CommonDirective',
            app.common.CommonDirective.Factory()
            )*/;

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