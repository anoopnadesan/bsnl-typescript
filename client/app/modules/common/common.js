(function () {
    'use strict';
    angular
        .module('app.common', [])
        .config(commonConfig) /*
    .directive('app.common.CommonDirective',
        app.common.CommonDirective.Factory()
        )*/;
    commonConfig.$inject = [
        '$routeProvider'
    ];
    function commonConfig($routeProvider) {
        $routeProvider.
            otherwise({
            redirectTo: '/events'
        });
    }
})();
