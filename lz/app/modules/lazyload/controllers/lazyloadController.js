var app;
(function (app) {
    var lazyload;
    (function (lazyload) {
        'use strict';
        var LazyLoadController = (function () {
            function LazyLoadController(LazyLoadService, $scope, lzConfig) {
                var _this = this;
                this.LazyLoadService = LazyLoadService;
                this.$scope = $scope;
                this.lzConfig = lzConfig;
                this.lzcount = 0;
                this.lzData = [];
                this.lzDataValue = [];
                this.LazyLoadService.getData()
                    .then(function (data) {
                    _this.lzData = data;
                    _this.lazyLoad(false);
                });
            }
            LazyLoadController.prototype.lazyLoad = function (digest) {
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    this.lzDataValue.push(this.lzData[i + this.lzcount]);
                this.lzcount += this.lzConfig.recordsLimit;
                if (digest)
                    this.$scope.$digest();
                console.log("Total records loaded: " + this.lzcount);
            };
            LazyLoadController.$inject = [
                'LazyLoadService',
                '$scope',
                'lzConfig'
            ];
            return LazyLoadController;
        })();
        angular
            .module('app.lazyload')
            .controller('LazyLoadController', LazyLoadController);
    })(lazyload = app.lazyload || (app.lazyload = {}));
})(app || (app = {}));
