var app;
(function (app) {
    var directory;
    (function (directory) {
        'use strict';
        var DirectoryController = (function () {
            function DirectoryController($rootScope, SocketService, $scope) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.SocketService = SocketService;
                this.$scope = $scope;
                this.$rootScope.dataLoaded = false;
                this.$rootScope.currentMenuItem = "directories";
                this.$rootScope.jumbotron = "Directory list - from socket";
                this.SocketService.getSocketData("directoryDataList", function (response) {
                    _this.directories = response;
                    _this.$scope.$digest();
                    _this.$rootScope.dataLoaded = true;
                    _this.$rootScope.$digest();
                });
            }
            DirectoryController.$inject = [
                '$rootScope',
                'app.common.SocketService',
                '$scope'
            ];
            return DirectoryController;
        })();
        angular
            .module('app.directory')
            .controller('DirectoryController', DirectoryController);
    })(directory = app.directory || (app.directory = {}));
})(app || (app = {}));
