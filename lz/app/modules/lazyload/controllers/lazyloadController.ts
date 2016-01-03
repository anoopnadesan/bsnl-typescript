module app.lazyload {
    'use strict';

    export interface Ilazyload {
		eventId: number;
		subscriberId: number;
        content: string;
	}
    
	export interface IlazyloadScope {
        lzData: app.lazyload.Ilazyload[];
        lzDataValue: app.lazyload.Ilazyload[];
        lazyLoad:(digest: boolean) => void;
        lzcount: number;
	}
    
    class LazyLoadController implements IlazyloadScope {
        lzData: app.lazyload.Ilazyload[];
        lzDataValue: app.lazyload.Ilazyload[];
        lzcount: number;

        static $inject = [
            'LazyLoadService',
            '$scope',
            'lzConfig'
        ];
		
        constructor(
            private LazyLoadService: LazyLoadService,
            private $scope: ng.IScope,
            private lzConfig) {
                this.lzcount = 0;
                this.lzDataValue = [];
                this.LazyLoadService.getData()
                    .then( (data) => {
                        this.lzData = data;
                        this.lazyLoad(false);
                    } );
        }

        lazyLoad(digest): void {
            for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                this.lzDataValue.push(this.lzData[i+this.lzcount]);
            this.lzcount += this.lzConfig.recordsLimit;
            if(digest)
                this.$scope.$digest();
            console.log("Total records loaded: "+this.lzcount);
        }
	}

    angular
        .module('app.lazyload')
        .controller('LazyLoadController',
        LazyLoadController);
}