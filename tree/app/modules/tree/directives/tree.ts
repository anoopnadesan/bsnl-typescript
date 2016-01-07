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
        
        public link = (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
            
            /*element.find('a.treenode').bind("click", function() {
                console.log('spanyyy');
                //$(this).parent().children("ul").toggle();
            });*/
            element.bind('click', function() {
                //console.log('spanyyy'+($(element).attr("class")));
                //$(element).parent().children("ul").toggle();
            });
            scope.clickNode = function(nodeid) {
                $('.node'+nodeid).parent().children("ul").toggle();
                scope.treecollapse({nodeid:nodeid});
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