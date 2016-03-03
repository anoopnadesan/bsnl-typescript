module app.directory {
    'use strict';

    export interface IDirectory {
		subscriberid: number;
		person: any;
		phonenumber: number;
        service: string;
	}
    
	interface IDirectoryScope {
        directories: app.directory.IDirectory[];
	}
    
    class DirectoryController implements IDirectoryScope {
        directories: app.directory.IDirectory[];

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
                this.$rootScope.currentMenuItem = "directories";
                this.$rootScope.jumbotron = "Directory list - from socket";
                this.SocketService.getSocketData("directoryDataList", (response) => {
                    this.directories = response;
                    this.$scope.$digest();
                    this.$rootScope.dataLoaded = true;
                    this.$rootScope.$digest();
                });
        }
	}

    angular
        .module('app.directory')
        .controller('DirectoryController',
        DirectoryController);
}