var app;
(function (app) {
    var highchart;
    (function (highchart) {
        'use strict';
        var HighchartController = (function () {
            function HighchartController($scope) {
                this.$scope = $scope;
                this.chartTypes = [
                    { "id": "line", "title": "Line" },
                    { "id": "bar", "title": "Bar" },
                    { "id": "pie", "title": "Pie" }
                ];
                this.chartSeries = [
                    { "name": "Player", "data": [80, 70, 62, 73, 84], type: "column" }
                ];
                this.chartConfig = {
                    options: {
                        chart: {
                            type: 'line'
                        },
                        plotOptions: {
                            series: {
                                stacking: ''
                            }
                        },
                        yAxis: {
                            title: {
                                text: "Average (%)"
                            }
                        },
                        title: {
                            text: 'Chart with angular-Typescript'
                        },
                        credits: {
                            title: "Tantalus"
                        }
                    },
                    series: this.chartSeries,
                    credits: {
                        enabled: true
                    },
                    loading: false,
                    size: {}
                };
            }
            HighchartController.prototype.ensureIds = function (series) {
                var changed = false;
                angular.forEach(series, function (s) {
                    if (!angular.isDefined(s.id)) {
                        s.id = 'series-' + this.seriesId++;
                        changed = true;
                    }
                });
                return changed;
            };
            ;
            HighchartController.$inject = [
                '$scope'
            ];
            return HighchartController;
        })();
        angular
            .module('app.highchart')
            .controller('HighchartController', HighchartController);
    })(highchart = app.highchart || (app.highchart = {}));
})(app || (app = {}));
