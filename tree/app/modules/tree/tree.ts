((): void => {
    'use strict';
    
    angular
        .module('app.tree', [])
        .constant("lzConfig", {
            "api": "http://localhost/json/treedata.php",
            "recordsLimit": 1
        });
})();