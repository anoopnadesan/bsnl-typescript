module app.tree {
    'use strict';
    
    export class treeMenu implements ng.IDirective {
        
        public restrict = 'E';
        public scope = {
            treescope: '=',
            treenode: '&',
            treeexpand: '&',
            treecollapse: '&'
        };
        
        public templateUrl = function (element, attrs) {
            return attrs.templateUrl;
        };
        
        public replace = true;
        //public transclude = true;
        //public template = '<ul><li ng-repeat="child in tmpLoad"><a href="javascript:void(0);" ng-click="clickNode(child.id,child.class);" class="node{{child.class}}">{{ child.text }}</a></li></ul>';
        
        public link = (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes/*, transclude:ng.ITranscludeFunction*/):void => {
            scope.clickNode = function(nodeid,nodeclass) {
                $('.node'+nodeclass).parent().children("ul").toggle();
                var template = '<ul><li ng-repeat="child in tmpLoad"><a href="javascript:void(0);" ng-click="clickNode(child.id,child.class);" class="node{{child.class}}">{{ child.text }}</a></li></ul>';
                scope.treecollapse({nodeid:nodeid});
                //$compile(element.contents())(scope);
                /*transclude(function(clone) {
                    $(clone).insertAfter('.node'+nodeclass);
                });*/
            }
        };
        
        static factory(): ng.IDirectiveFactory {
            const directive = () => new treeMenu();
            return directive;
        }
    }
    angular
        .module('app.tree')
        .directive('treeMenu',
        [treeMenu.factory()]);
}