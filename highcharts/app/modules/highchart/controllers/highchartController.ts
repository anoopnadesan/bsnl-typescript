module app.highchart {
    'use strict';
    
	export interface IChartScope {
        chartOptions : any;
        ngChart: any;
        chartType: string;
        ngChartLoad:() => void;
	}
    
    class HighchartController implements IChartScope {
        chartOptions : any;
        ngChart: any;
        chartType: string;

        static $inject = [
            '$scope'
        ];
		
        constructor(
            private $scope: ng.IScope) {
                this.chartType = "column";
                
                // Create the chart
                this.chartOptions = {
                    chart: {
                        renderTo : 'batsmen',
                        plotBorderWidth: 0
                    },

                    title: {
                        text: 'Runs scored in the period 1999-2012',
                    },
                    subtitle: {
                            text: 'Batting legends Sachin, Kallis and Lara'
                    },
                    xAxis: {
                            type: 'category',
                    },
                    yAxis: {
                            title: {
                                margin: 10,
                                text: 'Runs'
                            },
                            labels: {
                                formatter: function () {
                                    return Highcharts.numberFormat(this.value,0);
                                }
                            }
                    },
                    legend: {
                        enabled: true,
                    },
                    plotOptions: {
                        series: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        },
                        pie: {
                            plotBorderWidth: 0,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            size: '100%',
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: <b>{point.y}</b>'
                            }
                        }
                    },
                    series: [{
                            name: 'Players',
                            colorByPoint: true,
                            data: [{
                                name: 'Sachin',
                                y: 18000
                            }, {
                                name: 'Kallis',
                                y: 13200
                            }, {
                                name: 'Lara',
                                y: 10700
                            }, {
                                name: 'Ponting',
                                y: 11800
                            }]
                        }],
                    credits: {
                        enabled: false
                    },
                    drilldown: {
                        series: []
                    }
                };
        }
        
        ngChartLoad() : void {
            this.chartOptions.chart.type = this.chartType;
            var ngChart = new Highcharts.Chart(this.chartOptions);
        }
	}

    angular
        .module('app.highchart')
        .controller('HighchartController',
        HighchartController);
}