var app;
(function (app) {
    var common;
    (function (common) {
        'use strict';
        var ChartDataService = (function () {
            function ChartDataService(httpService) {
                this.httpService = httpService;
            }
            ChartDataService.prototype.getData = function () {
                var result = this.httpService.get('http://localhost:8080/data/data.json')
                    .then(function (response) { return response.data; });
                //console.log(result);
                return result;
            };
            ChartDataService.$inject = [
                '$http'
            ];
            return ChartDataService;
        })();
        common.ChartDataService = ChartDataService;
        angular
            .module('app.common')
            .service('ChartDataService', ChartDataService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
