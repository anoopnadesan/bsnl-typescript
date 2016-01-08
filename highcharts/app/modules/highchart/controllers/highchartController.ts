module app.highchart {
    'use strict';

    export interface IChartTypes {
		id: string;
		title: string;
	}

    export interface IChartSeries {
		name: string;
		data: any;
        type: string;
	}
    
	export interface IChartScope {
        chartTypes: app.highchart.IChartTypes[];
        chartSeries: app.highchart.IChartSeries[];
        chartConfig : any;
        seriesId: number;
        ensureIds:(series) => boolean;
	}
    
    class HighchartController implements IChartScope {
        chartTypes: app.highchart.IChartTypes[];
        chartSeries: app.highchart.IChartSeries[];
        chartConfig : any;
        seriesId: number;

        static $inject = [
            '$scope'
        ];
		
        constructor(
            private $scope: ng.IScope) {
                this.chartTypes = [
                    {"id": "line", "title": "Line"},
                    {"id": "bar", "title": "Bar"},
                    {"id": "pie", "title": "Pie"}
                ];
                this.chartSeries = [
                    {"name": "Player", "data": [80,70, 62,73, 84], type: "column"}
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
        
        ensureIds(series): boolean {
            var changed = false;
            angular.forEach(series, function(s) {
                if (!angular.isDefined(s.id)) {
                    s.id = 'series-' + this.seriesId++;
                    changed = true;
                }
            });
            return changed;
        };
	}

    angular
        .module('app.highchart')
        .controller('HighchartController',
        HighchartController);
}