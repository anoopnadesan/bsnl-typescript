(function () {
    'use strict';
    angular
        .module('app.directory', [])
        .config(directoryConfig);
    directoryConfig.$inject = [
        '$routeProvider'
    ];
    function directoryConfig($routeProvider) {
        $routeProvider.
            when('/directories', {
            controller: 'DirectoryController as vm',
            templateUrl: 'app/modules/directory/templates/directoryView.html'
        });
    }
})();
