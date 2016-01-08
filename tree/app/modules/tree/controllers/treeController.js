var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var TreeController = (function () {
            function TreeController(treeService, $scope, lzConfig) {
                var _this = this;
                this.treeService = treeService;
                this.$scope = $scope;
                this.lzConfig = lzConfig;
                this.rootData = [];
                this.nodeData = [];
                this.treeService.getData("")
                    .then(function (data) {
                    _this.rootData = data;
                });
            }
            TreeController.prototype.loadMenuItems = function (nodeid) {
                var _this = this;
                this.treeService.getData(nodeid)
                    .then(function (data) {
                    _this.nodeData = data; //console.log(data);
                    //this.$scope.$digest();
                });
            };
            TreeController.$inject = [
                'treeService',
                '$scope',
                'lzConfig'
            ];
            return TreeController;
        })();
        angular
            .module('app.tree')
            .controller('TreeController', TreeController);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
