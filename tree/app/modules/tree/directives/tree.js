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
                //public transclude = true;
                //public template = '<ul><li ng-repeat="child in tmpLoad"><a href="javascript:void(0);" ng-click="clickNode(child.id,child.class);" class="node{{child.class}}">{{ child.text }}</a></li></ul>';
                this.link = function (scope, element, attrs /*, transclude:ng.ITranscludeFunction*/) {
                    scope.clickNode = function (nodeid, nodeclass) {
                        $('.node' + nodeclass).parent().children("ul").toggle();
                        var template = '<ul><li ng-repeat="child in tmpLoad"><a href="javascript:void(0);" ng-click="clickNode(child.id,child.class);" class="node{{child.class}}">{{ child.text }}</a></li></ul>';
                        scope.treecollapse({ nodeid: nodeid });
                        //$compile(element.contents())(scope);
                        /*transclude(function(clone) {
                            $(clone).insertAfter('.node'+nodeclass);
                        });*/
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
