var app;
(function (app) {
    var lazyload;
    (function (lazyload) {
        'use strict';
        var lazyLoadList = (function () {
            function lazyLoadList() {
                this.restrict = 'E';
                this.scope = {
                    lzscope: '=',
                    lazyLoad: '&'
                };
                this.templateUrl = function (element, attrs) {
                    return attrs.templateUrl;
                };
                this.replace = true;
                this.link = function (scope, element, attrs) {
                    element.find('.lazy-load-container').bind("scroll", function () {
                        if ($(this)[0].scrollHeight - $(this).scrollTop() <= ($(this).height() + ($(this).height() * .05))) {
                            scope.lazyLoad(true);
                        }
                        ;
                    });
                };
            }
            lazyLoadList.factory = function () {
                var directive = function () { return new lazyLoadList(); };
                return directive;
            };
            return lazyLoadList;
        })();
        lazyload.lazyLoadList = lazyLoadList;
        angular
            .module('app.lazyload')
            .directive('lazyLoadList', [lazyLoadList.factory()]);
    })(lazyload = app.lazyload || (app.lazyload = {}));
})(app || (app = {}));
