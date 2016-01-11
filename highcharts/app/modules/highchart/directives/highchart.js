var app;
(function (app) {
    var highchart;
    (function (highchart_1) {
        'use strict';
        var highchart = (function () {
            function highchart() {
                this.restrict = 'E';
                this.replace = true;
                this.scope = {
                    chartType: '=',
                    ngChartLoad: '&',
                    chartOptions: '='
                };
                this.templateUrl = function (element, attrs) {
                    return attrs.templateUrl;
                };
                this.link = function (scope, element, attrs, ctrl) {
                    element.find('.myNgTsdchart').bind("click", function () {
                        scope.ngChartLoad();
                    });
                };
            }
            highchart.factory = function () {
                var directive = function () { return new highchart(); };
                return directive;
            };
            highchart.$inject = [
                '$scope'
            ];
            return highchart;
        })();
        highchart_1.highchart = highchart;
        angular
            .module('app.highchart')
            .directive('highchart', [highchart.factory()]);
    })(highchart = app.highchart || (app.highchart = {}));
})(app || (app = {}));
