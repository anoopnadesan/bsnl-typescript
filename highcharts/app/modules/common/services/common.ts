module app.common
{
    'use strict';
    
    export interface IData {
        getData() : any;
    }
    
    export class ChartDataService implements IData {
        static $inject = [
            '$http'
        ];
        
        constructor(
            private httpService: ng.IHttpService
        ) {}

        getData(): ng.IPromise< any > {
            var result: ng.IPromise< any > = this.httpService.get('data/data.json')
            .then( ( response: any ): ng.IPromise< any > => response.data );
            return result;
        }
    }
    
    angular
        .module('app.common')
        .service('ChartDataService',
        ChartDataService);
}