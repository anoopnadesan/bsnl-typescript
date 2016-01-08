var app;
(function (app) {
    var tree;
    (function (tree) {
        'use strict';
        var treeService = (function () {
            function treeService(httpService, lzConfig) {
                this.httpService = httpService;
                this.lzConfig = lzConfig;
            }
            treeService.prototype.getData = function (node) {
                var result = this.httpService.get(this.lzConfig.api + (node == '' ? '' : '?node=' + node))
                    .then(function (response) { return response.data; });
                return result;
            };
            treeService.$inject = [
                '$http',
                'lzConfig'
            ];
            return treeService;
        })();
        tree.treeService = treeService;
        angular
            .module('app.tree')
            .service('treeService', treeService);
    })(tree = app.tree || (app.tree = {}));
})(app || (app = {}));
