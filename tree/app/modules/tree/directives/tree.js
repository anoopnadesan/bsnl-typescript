var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var treeMenu = (function () {
            function treeMenu() {
                this.restrict = 'E';
                this.scope = {
                    treescope: '=',
                    treenode: '&',
                    treeexpand: '&',
                    treecollapse: '&'
                };
                this.templateUrl = function (element, attrs) {
                    return attrs.templateUrl;
                };
                this.replace = true;
                this.link = function (scope, element, attrs) {
                    /*element.find('a.treenode').bind("click", function() {
                        console.log('spanyyy');
                        //$(this).parent().children("ul").toggle();
                    });*/
                    element.bind('click', function () {
                        //console.log('spanyyy'+($(element).attr("class")));
                        //$(element).parent().children("ul").toggle();
                    });
                    scope.clickNode = function (nodeid) {
                        $('.node' + nodeid).parent().children("ul").toggle();
                        scope.treecollapse({ nodeid: nodeid });
                    };
                };
            }
            treeMenu.factory = function () {
                var directive = function () { return new treeMenu(); };
                return directive;
            };
            return treeMenu;
        })();
        tree.treeMenu = treeMenu;
        angular
            .module('app.tree')
            .directive('treeMenu', [treeMenu.factory()]);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
