/*module app.common
{
    export interface IJumbotronScope extends ng.IRootScopeService {
        jumbotron: string;
    }

    export class siteJumbotron implements IJumbotronScope {
        jumbotron : string;
        
        constructor() {
            createJumbotron();
        }

        createJumbotron() {
            return {
                restrict: "E",
                scope: {
                    jumbotron: "@"
                },
                template: '<div class="jumbotron"><p>{{ jumbotron }}</p></div>',
                replace: true
            }
        }
}*/
