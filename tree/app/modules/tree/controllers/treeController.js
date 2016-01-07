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
                this.treeData = [];
                this.treeDataValue = [];
                this.treeService.getData()
                    .then(function (data) {
                    _this.treeData = data; //console.log(data);
                    _this.treeLoad();
                });
            }
            TreeController.prototype.treeLoad = function () {
                var liClass = "";
                for (var i = 0; i < this.treeData.length; i++) {
                    var tmp = [];
                    liClass = (this.treeData[i].id).toString();
                    liClass = liClass.replace(".", "");
                    this.treeDataValue[i] = { "id": this.treeData[i].id, "text": this.treeData[i].text, "class": liClass };
                    if (this.treeData[i].child) {
                        for (var j = 0; j < this.treeData[i].child.length; j++) {
                            liClass = (this.treeData[i].child[j].id).toString();
                            liClass = liClass.replace(".", "");
                            tmp[j] = { "id": this.treeData[i].child[j].id, "text": this.treeData[i].child[j].text, "class": liClass };
                        }
                    }
                    liClass = (this.treeData[i].id).toString();
                    liClass = liClass.replace(".", "");
                    if (tmp.length > 0)
                        this.treeDataValue[i] = { "id": this.treeData[i].id, "text": this.treeData[i].text, "class": liClass, "child": tmp };
                    else
                        this.treeDataValue[i] = { "id": this.treeData[i].id, "text": this.treeData[i].text, "class": liClass };
                }
                console.log(this.treeDataValue);
            };
            /*treeExpand(nodeid): void {
                console.log("id from ctrl ="+nodeid);
            }*/
            TreeController.prototype.treeCollapse = function (nodeid) {
                //console.log(this.treeDataValue);
                var nodes = (nodeid.toString()).split(".");
                //console.log(nodeid+"<-- id from ctrl #"+nodes);
                var parentObj = "[" + (nodes[0] - 1) + "]";
                for (var i = 1; i < nodes.length; i++) {
                    parentObj += ".child[" + (nodes[i] - 1) + "]";
                }
                //console.log(this.treeData[0].child[1]);
                parentObj += ".child";
                //console.log("this.treeDataValue"+parentObj);console.log(eval("this.treeDataValue"+parentObj));
                var child = [];
                var grandChild = [];
                var tmpObj = {};
                var tmpId, tmpText, tmpClass;
                var liClass = "";
                if (eval("this.treeDataValue" + parentObj)) {
                    //console.log(eval("this.treeDataValue"+parentObj));
                    for (var j = 0; j < eval("this.treeDataValue" + parentObj + ".length"); j++) {
                        //console.log(eval("this.treeDataValue"+parentObj+"["+j+"].id"));
                        child[j] = { "id": eval("this.treeDataValue" + parentObj + "[" + j + "].id"), "text": eval("this.treeDataValue" + parentObj + "[" + j + "].text") };
                        var childObj = parentObj + "[" + j + "].child";
                        if (eval("this.treeData" + childObj)) {
                            eval("this.treeDataValue" + childObj + " = []");
                            for (var k = 0; j < eval("this.treeData" + childObj + ".length"); j++) {
                                //grandChild[k] = {"id":eval("this.treeData"+childObj+"["+j+"].id"), "text":eval("this.treeData"+childObj+"["+j+"].text")};
                                eval("tmpId = this.treeData" + childObj + "[" + j + "].id");
                                eval("tmpText = this.treeData" + childObj + "[" + j + "].text");
                                liClass = tmpId.toString();
                                liClass = liClass.replace(".", "");
                                eval("tmpClass = liClass");
                                eval("tmpObj.id = tmpId");
                                eval("tmpObj.text = tmpText");
                                eval("tmpObj.class = tmpClass"); //console.log(tmpObj);
                                eval("this.treeDataValue" + childObj + "[" + k + "] = tmpObj");
                            }
                        }
                    }
                    //var j = i;
                    //console.log(child);
                    //this.$scope.$digest();
                    console.log(this.treeDataValue);
                }
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
