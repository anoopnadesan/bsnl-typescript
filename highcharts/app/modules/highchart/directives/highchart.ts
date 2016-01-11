module app.highchart {
    'use strict';
    
    export class highchart implements ng.IDirective {

        static $inject = [
            '$scope'
        ];
        
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