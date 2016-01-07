((): void => {
    'use strict';
    
    angular
        .module('app.lazyload', [])
        .constant("lzConfig", {
            "jsonDataUrl": "data/data.json",
            "recordsLimit": 100,
            "loadScrollEndPercentage": .05
        });
})();