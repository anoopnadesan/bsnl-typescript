var app;
(function (app) {
    var common;
    (function (common) {
        'use strict';
        var socket = io("http://localhost:3001/");
        var SocketService = (function () {
            function SocketService($timeout, $rootScope) {
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
            }
            SocketService.prototype.getSocketData = function (listener, callback) {
                this.$timeout(function () {
                    socket.on(listener, function(evt) {
                        callback(JSON.parse(evt));
                    });
                }, 1000);
            };
            SocketService.$inject = [
                '$timeout',
                '$rootScope'
            ];
            return SocketService;
        })();
        common.SocketService = SocketService;
        angular
            .module('app.common')
            .service('app.common.SocketService', SocketService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
