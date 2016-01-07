(function () {
    'use strict';
    angular
        .module('app.tree', [])
        .constant("lzConfig", {
        "jsonDataUrl": "data/data.json",
        "recordsLimit": 1
    });
})();
