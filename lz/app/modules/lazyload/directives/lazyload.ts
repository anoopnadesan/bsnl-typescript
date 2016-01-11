module app.lazyload {
    'use strict';
    
    export class lazyLoadList implements ng.IDirective {
        
        public restrict = 'E';
        public scope = {
            lzscope: '=',
            lazyLoad:'&'
        };
        
        public templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        
        public replace = true;
        
        public link = (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
            element.find('.lazy-load-container').bind("scroll", function() {
                // 
                if ($(this)[0].scrollHeight - $(this).scrollTop() <= ($(this).height() + ($(this).height() * .05))) {
                    scope.lazyLoad(true);
                };
            })
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