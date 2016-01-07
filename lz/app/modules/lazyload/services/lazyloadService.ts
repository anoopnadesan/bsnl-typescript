module app.lazyload
{
    'use strict';
    
    export class LazyLoadService {
        static $inject = [
            '$http',
            'lzConfig'
        ];
        
        constructor(
            private httpService: ng.IHttpService,
            private lzConfig
        ) {}

        // Will use php or node api to get limited data
        getData(): ng.IPromise< any > {
            var result: ng.IPromise< any > = this.httpService.get(this.lzConfig.jsonDataUrl)
            .then( ( response: any ): ng.IPromise< any > => response.data );
            return result;
        }
    }
    
    angular
        .module('app.lazyload')
        .service('LazyLoadService',
        LazyLoadService);
}