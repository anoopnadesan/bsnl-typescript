((): void => {
    'use strict';
    angular
        .module('app.common', [])
        .config(commonConfig)/*
        .directive('src.shared.CommonDirective',
            src.shared.CommonDirective.Factory()
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