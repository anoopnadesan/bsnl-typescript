module app.lazyload {
    'use strict';
    
    export class lazyLoadList implements ng.IDirective {
        
        public restrict = 'E';
        public scope = {
            lzscope: '=',
            lazyLoad: '&',
            lzPgNext: '&',
            lzPgPrev: '&',
            lzPgFirst: '&',
            lzPgLast: '&',
            pgFirst: '=',
            pgLast: '=',
            pgCurr:'='
        };
        
        public templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        
        public replace = true;
        
        public link = (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
            
            element.find('.pg-next').bind("click", function() {
                if(!$(this).hasClass("disabled"))
                {
                    scope.lzPgNext();
                }
            });
            element.find('.pg-prev').bind("click", function() {
                if(!$(this).hasClass("disabled"))
                {
                    scope.lzPgPrev();
                }
            });
            element.find('.pg-first').bind("click", function() {
                if(!$(this).hasClass("disabled"))
                {
                    scope.lzPgFirst();
                }
            });
            element.find('.pg-last').bind("click", function() {
                if(!$(this).hasClass("disabled"))
                {
                    scope.lzPgLast();
                }
            });
        };
        
        static factory(): ng.IDirectiveFactory {
            const directive = () => new lazyLoadList();
            return directive;
        }
    }
    angular
        .module('app.lazyload')
        .directive('lazyLoadList',
        [lazyLoadList.factory()]);
}