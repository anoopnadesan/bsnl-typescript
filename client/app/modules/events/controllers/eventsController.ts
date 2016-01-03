module app.events {
    'use strict';

    export interface IEvents {
		eventId: number;
		name: string;
		location: string;
		organizer: string;
	}

	interface IEventsScope {
        events: app.events.IEvents[];
	}

    class EventsController implements IEventsScope {
        events: app.events.IEvents[];

        static $inject = [
            '$rootScope',
            'app.common.SocketService',
            '$scope'
        ];
		
        constructor(
            private $rootScope:app.login.IAppRootScope,
            private SocketService: app.common.SocketService,
            private $scope: ng.IScope) {
                this.$rootScope.dataLoaded = false;
                this.$rootScope.currentMenuItem = "events";
                this.$rootScope.jumbotron = "Events list - from socket";
                this.SocketService.getSocketData("eventsDataList", (response) => {
                    this.events = response;
                    this.$scope.$digest();
                    this.$rootScope.dataLoaded = true;
                    this.$rootScope.$digest();
                });
        }
	}

    angular
        .module('app.events')
        .controller('EventsController',
        EventsController);
}