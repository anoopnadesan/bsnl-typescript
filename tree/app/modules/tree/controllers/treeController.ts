module app.tree {
    'use strict';

    export interface ITree {
		id: number;
		item: string;
	}
    
	export interface ITreeScope {
        rootData: app.tree.ITree[];
        nodeData: app.tree.ITree[];
        loadMenuItems:(nodeid: string) => void;
	}
    
    class TreeController implements ITreeScope {
        rootData: app.tree.ITree[];
        nodeData: app.tree.ITree[];

        static $inject = [
            'treeService',
            '$scope',
            'lzConfig'
        ];
		
        constructor(
            private treeService: treeService,
            private $scope: ng.IScope,
            private lzConfig) {
                this.rootData = [];
                this.nodeData = [];
                
                this.treeService.getData("")
                    .then((data) => {
                        this.rootData = data;
                    });
        }

        loadMenuItems(nodeid): void {              
            this.treeService.getData(nodeid)
                .then((data) => {
                    this.nodeData = data;//console.log(data);
                    //this.$scope.$digest();
                });
            
        }
	}

    angular
        .module('app.tree')
        .controller('TreeController',
        TreeController);
}