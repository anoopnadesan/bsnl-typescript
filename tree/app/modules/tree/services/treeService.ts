module app.tree
{
    'use strict';
    
    export class treeService {
        static $inject = [
            '$http',
            'lzConfig'
        ];
        
        constructor(
            private httpService: ng.IHttpService,
            private lzConfig
        ) {}

        getData(node): ng.IPromise< any > {
            var result: ng.IPromise< any > = this.httpService.get(this.lzConfig.api + (node=='' ? '' : '?node='+node))
            .then( ( response: any ): ng.IPromise< any > => response.data );
            return result;
        }
    }
    
    angular
        .module('app.tree')
        .service('treeService',
        treeService);
}