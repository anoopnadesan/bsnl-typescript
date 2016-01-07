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
                    lazyLoad: '&',
                    lzPgNext: '&',
                    lzPgPrev: '&',
                    lzPgFirst: '&',
                    lzPgLast: '&',
                    pgFirst: '=',
                    pgLast: '=',
                    pgCurr: '='
                };
                this.templateUrl = function (element, attrs) {
                    return attrs.templateUrl;
                };
                this.replace = true;
                this.link = function (scope, element, attrs) {
                    element.find('.pg-next').bind("click", function () {
                        if (!$(this).hasClass("disabled")) {
                            scope.lzPgNext();
                        }
                    });
                    element.find('.pg-prev').bind("click", function () {
                        if (!$(this).hasClass("disabled")) {
                            scope.lzPgPrev();
                        }
                    });
                    element.find('.pg-first').bind("click", function () {
                        if (!$(this).hasClass("disabled")) {
                            scope.lzPgFirst();
                        }
                    });
                    element.find('.pg-last').bind("click", function () {
                        if (!$(this).hasClass("disabled")) {
                            scope.lzPgLast();
                        }
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
