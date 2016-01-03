((): void => {
    'use strict';
    angular
        .module('app.directory', [])
        .config(directoryConfig);

    directoryConfig.$inject = [
        '$routeProvider'
    ];
    
    function directoryConfig(
        $routeProvider: ng.route.IRouteProvider): void {            
            $routeProvider.
                when('/directories', {
                    controller: 'DirectoryController as vm',
                    templateUrl: 'app/modules/directory/templates/directoryView.html'                    
                });
    }
})();