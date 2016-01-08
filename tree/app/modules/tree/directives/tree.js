var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var treeMenu = (function () {
            function treeMenu() {
                this.restrict = 'E';
                this.scope = {
                    rootData: '=',
                    nodeData: '=',
                    loadMenuItems: '&'
                };
                this.templateUrl = function (element, attrs) {
                    return attrs.templateUrl;
                };
                this.replace = true;
                //public transclude = true;
                this.link = function (scope, element, attrs /*, transclude:ng.ITranscludeFunction*/) {
                    scope.clickNode = function (nodeid) {
                        //console.log('nodeid='+nodeid);
                        //$('.node'+nodeid).parent().children("ul").toggle();
                        //var template = '<ul><li><a href="javascript:void(0);" ng-click="clickNode(node.id);" class="node{{node.id}}">{{ node.item }}</a></li></ul>';
                        scope.loadMenuItems({ nodeid: nodeid });
                        //console.log(scope.nodeData);
                        // Append it to the directive element
                        //element.append(template);
                        // And let Angular $compile it
                        //$compile(template)(scope);
                        //$compile(element.contents())(scope);
                        /*transclude(function(clone) {
                            $(clone).insertAfter('.node'+nodeclass);
                        });*/
                        scope.$watch('nodeData', function (nodedata) {
                            if (nodedata) {
                                console.log("|" + nodeid + "|");
                                for (var i = 0; i < nodedata.length; i++) {
                                    //console.log(nodedata[i].id);
                                    //$('<ul><li><a href="javascript:void(0);" ng-click="clickNode('+nodedata[i].id+');" class="node'+nodedata[i].id+'">'+nodedata[i].item+'</a></li></ul>').insertAfter('node'+nodeid);
                                    //$('ffffffffffffff').insertAfter('.node'+nodeid);
                                    $('.node' + nodeid).append('ffffffffffffff');
                                }
                            }
                        });
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
