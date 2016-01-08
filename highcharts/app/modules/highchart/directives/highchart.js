var app;
(function (app) {
    var highchart;
    (function (highchart_1) {
        'use strict';
        var highchart = (function () {
            function highchart() {
                this.restrict = 'EAC';
                this.replace = true;
                this.template = '<div></div>';
                this.scope = {
                    config: '='
                };
                this.link = function (scope, element, attrs) {
                    // We keep some chart-specific variables here as a closure
                    // instead of storing them on 'scope'.
                    var processSeries = function (series) {
                        var ids = [];
                        if (series) {
                            var setIds = this.ensureIds(series);
                            //Find series to load or update
                            angular.forEach(series, function (s) {
                                ids.push(s.id);
                                var chartSeries = chart.get(s.id);
                                if (chartSeries) {
                                    chartSeries.update(angular.copy(s), false);
                                } else {
                                    chart.addSeries(angular.copy(s), false);
                                }
                            });
                        }
                        return true;
                    };
                    // chart is maintained by initChart
                    var chart = false;
                    var initChart = function () {
                        var config = scope.config || {};
                        var chartOptions = config.options;
                        chartOptions.chart.renderTo = element[0];
                        var chartType = 'Chart';
                        chart = new window.Highcharts[chartType](config.options);
                    };
                    initChart();
                    scope.$watch('config.series', function (newSeries, oldSeries) {
                        var needsRedraw = processSeries(newSeries);
                        if(needsRedraw) chart.redraw();
                    }, true);
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
