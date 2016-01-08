module app.highchart {
    'use strict';
    
    //chart = new Highcharts[chartType](config.options);
    
    export class highchart implements ng.IDirective {
        
        public restrict = 'EAC';
        public replace = true;
        public template = '<div></div>';
        public scope = {
            config: '='
        };
        
        link = function (scope, element, attrs) {
            // We keep some chart-specific variables here as a closure
            // instead of storing them on 'scope'.

            var processSeries = function(series) {
                var ids = [];

                if(series) {
                    var setIds = this.ensureIds(series);

                    //Find series to load or update
                    angular.forEach(series, function(s) {
                        ids.push(s.id);
                        /*var chartSeries = chart.get(s.id);
                        if (chartSeries) {
                            chartSeries.update(angular.copy(s), false);
                        } else {
                            chart.addSeries(angular.copy(s), false);
                        }*/
                    });
                }
                return true;
            };

            // chart is maintained by initChart
            var chart = false;
            var initChart = function() {
                var config = scope.config || {};

                var chartOptions = config.options;		  
                chartOptions.chart.renderTo = element[0];

                var chartType = 'Chart';

                //chart = new Highcharts[chartType](config.options);
            };
            initChart();

            scope.$watch('config.series', function (newSeries, oldSeries) {
                var needsRedraw = processSeries(newSeries);
                //if(needsRedraw) chart.redraw();
            }, true);

        };

        static factory(): ng.IDirectiveFactory {
            const directive = () => new highchart();
            return directive;
        }
    }
    angular
        .module('app.highchart')
        .directive('highchart',
        [highchart.factory()]);
}