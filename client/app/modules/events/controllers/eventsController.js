var app;
(function (app) {
    var events;
    (function (events) {
        'use strict';
        var EventsController = (function () {
            function EventsController($rootScope, SocketService, $scope) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.SocketService = SocketService;
                this.$scope = $scope;
                this.$rootScope.dataLoaded = false;
                this.$rootScope.currentMenuItem = "events";
                this.$rootScope.jumbotron = "Events list - from socket";
                this.SocketService.getSocketData("eventsDataList", function (response) {
                    _this.events = response;
                    _this.$scope.$digest();
                    _this.$rootScope.dataLoaded = true;
                    _this.$rootScope.$digest();
                });
            }
            EventsController.$inject = [
                '$rootScope',
                'app.common.SocketService',
                '$scope'
            ];
            return EventsController;
        })();
        angular
            .module('app.events')
            .controller('EventsController', EventsController);
    })(events = app.events || (app.events = {}));
})(app || (app = {}));
