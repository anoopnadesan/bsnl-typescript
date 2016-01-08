'use strict';

var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope) {

  $scope.chartTypes = [
    {"id": "line", "title": "Line"},
    {"id": "bar", "title": "Bar"},
    {"id": "pie", "title": "Pie"}
  ];

  $scope.chartSeries = [
    {"name": "Player", "data": [80,70, 62,73, 84], type: "column"}/*,
    {"name": "Kallis", "data": [13000], type: "column"},
    {"name": "Dravid", "data": [13000], type: "column"},
    {"name": "AB Devilliers", "data": [17000], type: "column"},
    {"name": "Ponting", "data": [12000], type: "column"}*/
  ];

  $scope.chartStack = [
    {"id": '', "title": "No"},
    {"id": "normal", "title": "Normal"},
    {"id": "percent", "title": "Percent"}
  ];

  $scope.chartConfig = {
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
    series: $scope.chartSeries,
    credits: {
      enabled: true
    },
    loading: false,
    size: {}
  }
});