((): void => {
    'strict';
    
    angular
        .module('app', [
            'ngRoute',
            'app.lazyload'
        ]);
})();