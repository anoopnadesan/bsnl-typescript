var app;
(function (app) {
    var lazyload;
    (function (lazyload) {
        'use strict';
        var LazyLoadService = (function () {
            function LazyLoadService(httpService, lzConfig) {
                this.httpService = httpService;
                this.lzConfig = lzConfig;
            }
            LazyLoadService.prototype.getData = function () {
                var result = this.httpService.get(this.lzConfig.jsonDataUrl)
                    .then(function (response) { return response.data; });
                return result;
            };
            LazyLoadService.$inject = [
                '$http',
                'lzConfig'
            ];
            return LazyLoadService;
        })();
        lazyload.LazyLoadService = LazyLoadService;
        angular
            .module('app.lazyload')
            .service('LazyLoadService', LazyLoadService);
    })(lazyload = app.lazyload || (app.lazyload = {}));
})(app || (app = {}));
