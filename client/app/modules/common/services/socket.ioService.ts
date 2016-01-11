module app.common
{
    'use strict';

    var socket = ("http://localhost:3001/");    
    
    export interface ISocket {
        getSocketData(listener:string, callback:Function): void;
    }
    
    export class SocketService implements ISocket {
        static $inject = [
            '$timeout',
            '$rootScope'
        ];
        
        constructor(
            private $timeout: ng.ITimeoutService,
            private $rootScope: app.login.IAppRootScope
        ) {}

        getSocketData(listener,callback:Function): void {
            this.$timeout((): void => {
                socket.on(listener, function(evt) {
                    callback(JSON.parse(evt));
                });
            }, 1000);
        }
    }
    
    angular
        .module('app.common')
        .service('app.common.SocketService',
        SocketService);
}