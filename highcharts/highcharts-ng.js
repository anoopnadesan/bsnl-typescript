
(function () {
  'use strict';

  angular.module('highcharts-ng', [])
    .directive('highchart', [highchart]);

  function highchart() {

    // acceptable shared state
    var seriesId = 0;
    var ensureIds = function (series) {
      var changed = false;
      angular.forEach(series, function(s) {
        if (!angular.isDefined(s.id)) {
          s.id = 'series-' + seriesId++;
          changed = true;
        }
      });
      return changed;
    };

    var getChartOptions = function (scope, element, config) {
      var chartOptions = {};

      chartOptions = config.options;
      
      chartOptions.chart.renderTo = element[0];

      return chartOptions;
    };

    var res = {
      restrict: 'EAC',
      replace: true,
      template: '<div></div>',
      scope: {
        config: '='
      },
      link: function (scope, element, attrs) {
        // We keep some chart-specific variables here as a closure
        // instead of storing them on 'scope'.

        var processSeries = function(series) {
          var ids = [];

          if(series) {
            var setIds = ensureIds(series);

            //Find series to load or update
            angular.forEach(series, function(s) {
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
        var initChart = function() {
          var config = scope.config || {};
          var chartOptions = getChartOptions(scope, element, config);
          
          var chartType = 'Chart';

          chart = new Highcharts[chartType](config.options);

        };
        initChart();

        scope.$watch('config.series', function (newSeries, oldSeries) {
            var needsRedraw = processSeries(newSeries);
            if(needsRedraw) {
                chart.redraw();
            }
        }, true);
        
      }
    };
    
    return res;
  }
}());
