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
                /* Pagination vars */
                this.pgFirst = false;
                this.pgLast = false;
                this.pgPrev = 0;
                this.pgCurr = 1;
                this.pgNext = 2;
                this.lzcount = 0;
                this.lzData = [];
                this.lzDataValue = [];
                this.lzDataCurrValue = [];
                this.LazyLoadService.getData()
                    .then(function (data) {
                    _this.lzData = data;
                    _this.pgTotal = Math.floor(data.length / _this.lzConfig.recordsLimit);
                    if (_this.pgTotal > 1)
                        _this.pgLast = true;
                    _this.lazyLoad();
                });
            }
            LazyLoadController.prototype.lazyLoad = function () {
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    if (this.lzData[i + this.lzcount])
                        this.lzDataValue.push(this.lzData[i + this.lzcount]);
                this.lzDataCurrValue = [];
                for (var i = ((this.pgCurr - 1) * this.lzConfig.recordsLimit); i < (this.pgCurr * this.lzConfig.recordsLimit); i++)
                    if (this.lzDataValue[i])
                        this.lzDataCurrValue.push(this.lzDataValue[i]);
                this.lzcount += this.lzConfig.recordsLimit;
                console.log("Total records loaded: " + this.lzcount);
            };
            LazyLoadController.prototype.lazyLoadFirst = function () {
                this.lzDataCurrValue = [];
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    this.lzDataCurrValue.push(this.lzDataValue[i]);
                this.pgFirst = false;
                this.pgPrev = 0;
                this.pgCurr = 1;
                this.pgNext = 2;
                this.pgLast = (this.pgTotal > 1) ? true : false;
                this.$scope.$digest();
            };
            LazyLoadController.prototype.lazyLoadLast = function () {
                for (var i = ((this.pgTotal - 1) * this.lzConfig.recordsLimit); i < (this.lzConfig.recordsLimit + ((this.pgTotal - 1) * this.lzConfig.recordsLimit)); i++)
                    if (this.lzData[i])
                        this.lzDataValue[i] = this.lzData[i];
                //console.log((this.pgTotal*this.lzConfig.recordsLimit));
                //console.log(this.lzDataValue[this.pgTotal*this.lzConfig.recordsLimit]);
                //console.log(this.lzData[this.pgTotal*this.lzConfig.recordsLimit]);
                this.lzDataCurrValue = [];
                for (var i = ((this.pgTotal - 1) * this.lzConfig.recordsLimit); i < (this.lzConfig.recordsLimit + ((this.pgTotal - 1) * this.lzConfig.recordsLimit)); i++)
                    if (this.lzDataValue[i])
                        this.lzDataCurrValue.push(this.lzDataValue[i]);
                this.pgFirst = true;
                this.pgPrev = this.pgTotal - 1;
                this.pgCurr = this.pgTotal;
                this.pgNext = this.pgTotal + 1;
                this.pgLast = false;
                this.$scope.$digest();
            };
            LazyLoadController.prototype.lazyLoadPrev = function () {
                if (!this.lzDataValue[((this.pgCurr - 1) * this.lzConfig.recordsLimit)]) {
                    for (var i = ((this.pgCurr - 1) * this.lzConfig.recordsLimit); i < (((this.pgCurr - 1) * this.lzConfig.recordsLimit) + this.lzConfig.recordsLimit); i++)
                        if (this.lzData[i])
                            this.lzDataValue[i] = this.lzData[i];
                    this.lzDataCurrValue = [];
                    for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                        if (this.lzDataValue[i + ((this.pgCurr - 1) * this.lzConfig.recordsLimit)])
                            this.lzDataCurrValue.push(this.lzDataValue[i + ((this.pgCurr - 1) * this.lzConfig.recordsLimit)]);
                }
                else {
                    this.lzDataCurrValue = [];
                    for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                        if (this.lzDataValue[i + ((this.pgCurr - 2) * this.lzConfig.recordsLimit)])
                            this.lzDataCurrValue.push(this.lzDataValue[i + ((this.pgCurr - 2) * this.lzConfig.recordsLimit)]);
                }
                this.pgFirst = ((this.pgCurr == 2) ? false : true);
                this.pgPrev--;
                this.pgCurr--;
                this.pgNext--;
                this.pgLast = true;
                this.$scope.$digest();
            };
            LazyLoadController.prototype.lazyLoadNext = function () {
                if (!this.lzDataValue[(this.pgCurr * this.lzConfig.recordsLimit)]) {
                    for (var i = (this.pgCurr * this.lzConfig.recordsLimit); i < ((this.pgCurr * this.lzConfig.recordsLimit) + this.lzConfig.recordsLimit); i++)
                        if (this.lzData[i])
                            this.lzDataValue.push(this.lzData[i]);
                }
                this.lzDataCurrValue = [];
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    if (this.lzDataValue[i + (this.pgCurr * this.lzConfig.recordsLimit)])
                        this.lzDataCurrValue.push(this.lzDataValue[i + (this.pgCurr * this.lzConfig.recordsLimit)]);
                this.pgFirst = true;
                this.pgPrev++;
                this.pgCurr++;
                this.pgNext++;
                this.pgLast = ((this.pgTotal > this.pgCurr) ? true : false);
                this.$scope.$digest();
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
