module app.highchart {
    'use strict';
    
    export class highchart implements ng.IDirective {
        
        public restrict = 'E';
        public replace = true;
        public scope = {
            chartType: '=',
            ngChartLoad: '&',
            chartOptions: '='
        };
        
        public templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        
        link = function (scope, element, attrs, ctrl) {
            scope.chartOptions.chart.renderTo = 'batsmen';
            scope.chartOptions.chart.type = scope.chartType;
            var ngChart = new Highcharts.Chart(scope.chartOptions);
            
            element.find('.myNgTsdchart').bind("click", function() {
                scope.ngChartLoad();
            });
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