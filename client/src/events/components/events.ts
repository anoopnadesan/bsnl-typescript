((): void => {
    'use strict';
    angular
        .module('app.events', [])
        .config(eventsConfig);

    eventsConfig.$inject = [
        '$routeProvider'
    ];
    
    function eventsConfig(
        $routeProvider: ng.route.IRouteProvider): void {            
            $routeProvider.
                when('/events', {
                    controller: 'EventsController as vm',
                    templateUrl: 'src/modules/events/templates/eventsView.html'
                });
    }
})();