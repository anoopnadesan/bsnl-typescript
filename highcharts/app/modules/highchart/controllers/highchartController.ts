module app.highchart {
    'use strict';
    
	export interface IChartScope {
        chartSeriesData: any;
        chartOptions : any;
        ngChart: any;
        chartType: string;
        ngChartLoad:() => void;
	}
    
    class HighchartController implements IChartScope {
        chartSeriesData: any;
        chartOptions : any;
        ngChart: any;
        chartType: string;

        static $inject = [
            '$scope',
            'ChartDataService'
        ];
		
        constructor(
            private $scope: ng.IScope,
            private ChartDataService: app.common.ChartDataService) {
                // Create the chart
                
                this.chartType = "column";                           
                this.ChartDataService.getData()
                    .then((cricData) => {
                        this.chartSeriesData = [];
                        var i = 0;
                        for(var players in cricData[0])
                        {
                            var runs = 0;
                            for(var score=0; score < cricData[0][players].data.length; score++)
                                runs += cricData[0][players].data[score][1];
                                    
                            this.chartSeriesData[i] = {
                                "name": cricData[0][players].name,
                                "y": runs,
                                "drilldown": true
                            };
                            i++;
                        }
                        
                        this.chartOptions = {
                            chart: {
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {

                                            var chart = this,
                                            drilldowns = cricData[0],
                                            series = drilldowns[e.point.name];
                                            // Show the loading label
                                            chart.showLoading('Loading ...');

                                            setTimeout(function () {
                                                chart.hideLoading();
                                                chart.addSeriesAsDrilldown(e.point, series);
                                            }, 1000); 
                                        }

                                    }
                                },
                                type: this.chartType,
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
                                name: "Players",
                                colorByPoint: true,
                                data: this.chartSeriesData
                            }],
                            credits: {
                                enabled: false
                            },
                            drilldown: {
                                series: []
                            }
                        };
                        this.chartOptions.chart.type = this.chartType;
                        var ngChart = new Highcharts.Chart(this.chartOptions);
                    });
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