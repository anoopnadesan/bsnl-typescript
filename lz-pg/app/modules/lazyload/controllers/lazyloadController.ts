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
        lzDataCurrValue: app.lazyload.Ilazyload[];
        lazyLoad:() => void;
        lazyLoadNext:() => void;
        lazyLoadPrev:() => void;
        lzcount: number;
        
        /* Pagination params */
        pgFirst:boolean;
        pgLast:boolean;
        pgPrev:number;
        pgCurr:number;
        pgNext:number;
        pgTotal:number;
	}
    
    class LazyLoadController implements IlazyloadScope {
        lzData: app.lazyload.Ilazyload[];
        lzDataValue: app.lazyload.Ilazyload[];
        lzDataCurrValue: app.lazyload.Ilazyload[];
        lzcount: number;
        
        /* Pagination vars */
        pgFirst:boolean = false;
        pgLast:boolean = false;
        pgPrev:number = 0;
        pgCurr:number = 1;
        pgNext:number = 2;
        pgTotal:number;

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
                this.lzData = [];
                this.lzDataValue = [];
                this.lzDataCurrValue = [];
                
                this.LazyLoadService.getData()
                    .then( (data) => {
                        this.lzData = data;
                        this.pgTotal = Math.floor(data.length/this.lzConfig.recordsLimit);
                        if(this.pgTotal>1) this.pgLast = true;
                        this.lazyLoad();
                    } );
        }

        lazyLoad(): void {
            for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                if(this.lzData[i+this.lzcount])
                    this.lzDataValue.push(this.lzData[i+this.lzcount]);

            this.lzDataCurrValue = [];
            for (var i = ((this.pgCurr-1)*this.lzConfig.recordsLimit); i < (this.pgCurr*this.lzConfig.recordsLimit); i++)
                if(this.lzDataValue[i])
                    this.lzDataCurrValue.push(this.lzDataValue[i]);

            this.lzcount += this.lzConfig.recordsLimit;
            console.log("Total records loaded: "+this.lzcount);
        }
    
        lazyLoadFirst(): void {
            
            this.lzDataCurrValue = [];
            for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                this.lzDataCurrValue.push(this.lzDataValue[i]);
            
            this.pgFirst = false;
            this.pgPrev = 0;
            this.pgCurr = 1;
            this.pgNext = 2;
            this.pgLast = (this.pgTotal>1) ? true : false;
            
            this.$scope.$digest();
        }
    
        lazyLoadLast(): void {
            for (var i = ((this.pgTotal-1)*this.lzConfig.recordsLimit); i < (this.lzConfig.recordsLimit + ((this.pgTotal-1)*this.lzConfig.recordsLimit)); i++)
                if(this.lzData[i])
                    this.lzDataValue[i] = this.lzData[i];
                    
//console.log((this.pgTotal*this.lzConfig.recordsLimit));
//console.log(this.lzDataValue[this.pgTotal*this.lzConfig.recordsLimit]);
//console.log(this.lzData[this.pgTotal*this.lzConfig.recordsLimit]);

            this.lzDataCurrValue = [];
            for (var i = ((this.pgTotal-1)*this.lzConfig.recordsLimit); i < (this.lzConfig.recordsLimit + ((this.pgTotal-1)*this.lzConfig.recordsLimit)); i++)
                if(this.lzDataValue[i])
                    this.lzDataCurrValue.push(this.lzDataValue[i]);
            
            this.pgFirst = true;
            this.pgPrev = this.pgTotal-1;
            this.pgCurr = this.pgTotal;
            this.pgNext = this.pgTotal+1;
            this.pgLast = false;
            
            this.$scope.$digest();
        }
    
        lazyLoadPrev(): void {

            if(!this.lzDataValue[((this.pgCurr-1)*this.lzConfig.recordsLimit)]) {
                for (var i = ((this.pgCurr-1)*this.lzConfig.recordsLimit); i < (((this.pgCurr-1)*this.lzConfig.recordsLimit)+this.lzConfig.recordsLimit); i++)
                    if(this.lzData[i])
                        this.lzDataValue[i] = this.lzData[i];

                this.lzDataCurrValue = [];
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    if(this.lzDataValue[i+((this.pgCurr-1)*this.lzConfig.recordsLimit)])
                        this.lzDataCurrValue.push(this.lzDataValue[i+((this.pgCurr-1)*this.lzConfig.recordsLimit)]);
                        
                //console.log(this.pgCurr);
                //console.log(this.lzData[(this.pgCurr-1)*this.lzConfig.recordsLimit]);
            }
            else
            {
                this.lzDataCurrValue = [];
                for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                    if(this.lzDataValue[i+((this.pgCurr-2)*this.lzConfig.recordsLimit)])
                        this.lzDataCurrValue.push(this.lzDataValue[i+((this.pgCurr-2)*this.lzConfig.recordsLimit)]);
            }
            
            this.pgFirst = ((this.pgCurr==2) ? false : true);
            this.pgPrev--;
            this.pgCurr--;
            this.pgNext--;
            this.pgLast = true;
            
            this.$scope.$digest();
        }
    
        lazyLoadNext(): void {

            if(!this.lzDataValue[(this.pgCurr*this.lzConfig.recordsLimit)]) {
                for (var i = (this.pgCurr*this.lzConfig.recordsLimit); i < ((this.pgCurr*this.lzConfig.recordsLimit)+this.lzConfig.recordsLimit); i++)
                    if(this.lzData[i])
                        this.lzDataValue.push(this.lzData[i]);
            }
            
            this.lzDataCurrValue = [];
            for (var i = 0; i < this.lzConfig.recordsLimit; i++)
                if(this.lzDataValue[i+(this.pgCurr*this.lzConfig.recordsLimit)])
                    this.lzDataCurrValue.push(this.lzDataValue[i+(this.pgCurr*this.lzConfig.recordsLimit)]);
            
            this.pgFirst = true;
            this.pgPrev++;
            this.pgCurr++;
            this.pgNext++;
            this.pgLast = ((this.pgTotal>this.pgCurr) ? true : false);
            
            this.$scope.$digest();
        }
	}

    angular
        .module('app.lazyload')
        .controller('LazyLoadController',
        LazyLoadController);
}