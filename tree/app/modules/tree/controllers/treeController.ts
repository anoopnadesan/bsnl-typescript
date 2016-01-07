module app.tree {
    'use strict';

    export interface ITree {
		id: string;
		text: string;
        parent: string;
        child: any;
	}
    
	export interface ITreeScope {
        treeData: app.tree.ITree[];
        treeDataValue: any;
        treeLoad:() => void;
        //treeExpand:(nodeid:string) => void;
        treeCollapse:(nodeid: string) => void;
	}
    
    class TreeController implements ITreeScope {
        treeData: app.tree.ITree[];
        treeDataValue: any;

        static $inject = [
            'treeService',
            '$scope',
            'lzConfig'
        ];
		
        constructor(
            private treeService: treeService,
            private $scope: ng.IScope,
            private lzConfig) {
                this.treeData = [];
                this.treeDataValue = [];
                
                this.treeService.getData()
                    .then( (data) => {
                        this.treeData = data;//console.log(data);
                        this.treeLoad();
                    } );
        }

        treeLoad(): void {
            for(var i=0; i < this.treeData.length; i++)
            {
                var tmp = [];
                this.treeDataValue[i] = {"id":this.treeData[i].id, "text":this.treeData[i].text};
                
                if(this.treeData[i].child)
                {
                    for(var j=0; j<this.treeData[i].child.length; j++)
                        tmp[j] = {"id":this.treeData[i].child[j].id, "text":this.treeData[i].child[j].text};
                }
                if(tmp.length>0)
                    this.treeDataValue[i] = {"id":this.treeData[i].id, "text":this.treeData[i].text, "child":tmp};
                else
                    this.treeDataValue[i] = {"id":this.treeData[i].id, "text":this.treeData[i].text};
            }
            console.log(this.treeDataValue);
        }

        /*treeExpand(nodeid): void {
            console.log("id from ctrl ="+nodeid);
        }*/

        treeCollapse(nodeid): void {
            console.log(this.treeDataValue);
            //this.$scope.$digest();
            var nodes = (nodeid.toString()).split(".");
            //console.log(nodeid+"<-- id from ctrl #"+nodes);
            
            var evalObj = "this.treeDataValue["+(nodes[0]-1)+"]";
            for(var i=1; i < nodes.length; i++) {
                evalObj += ".child["+(nodes[i]-1)+"]";
            }
            console.log(eval(evalObj));
            //console.log(this.treeData[0].child[1]);
            evalObj += ".child";
            
            var tmp = [];
            if(eval(evalObj))
            {
                console.log(evalObj);
                /*for(var j=0; j<this.treeData[i].child.length; j++)
                    tmp[j] = {"id":this.treeData[i].child[j].id, "text":this.treeData[i].child[j].text};*/
            }
        }
	}

    angular
        .module('app.tree')
        .controller('TreeController',
        TreeController);
}