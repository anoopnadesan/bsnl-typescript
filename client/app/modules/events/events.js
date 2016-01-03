(function () {
    'use strict';
    angular
        .module('app.events', [])
        .config(eventsConfig);
    eventsConfig.$inject = [
        '$routeProvider'
    ];
    function eventsConfig($routeProvider) {
        $routeProvider.
            when('/events', {
            controller: 'EventsController as vm',
            templateUrl: 'app/modules/events/templates/eventsView.html'
        });
    }
})();
