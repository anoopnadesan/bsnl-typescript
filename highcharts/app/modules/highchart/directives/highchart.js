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
                    scope.chartOptions.chart.renderTo = 'batsmen';
                    scope.chartOptions.chart.type = scope.chartType;
                    var ngChart = new Highcharts.Chart(scope.chartOptions);
                    element.find('.myNgTsdchart').bind("click", function () {
                        scope.ngChartLoad();
                    });
                };
            }
            highchart.factory = function () {
                var directive = function () { return new highchart(); };
                return directive;
            };
            return highchart;
        })();
        highchart_1.highchart = highchart;
        angular
            .module('app.highchart')
            .directive('highchart', [highchart.factory()]);
    })(highchart = app.highchart || (app.highchart = {}));
})(app || (app = {}));
