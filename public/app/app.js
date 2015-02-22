(function () {
    'use strict';

    var exampleCount = 0;

// Declare app level module which depends on views, and components
    angular.module('rwd', [
        'ngRoute',
        'rwd.landing',
        'rwd.section',
        'rwd.example',
        'rwd.feedback',
        'ui.ace'
    ])
        .constant('sections', {
            meta: {
                order: 0,
                name: 'Meta Tag',
                codeExample: '<meta name="viewport" content="width=device-width, initial-scale=1">',
                examples: {
                    basicScaling: {
                        name: 'Basic Scaling',
                        html: true
                    }
                    ,
                    noZoom: {
                        name: 'Preventing Zoom',
                        html: true
                    }
                }
            },
            sizing: {
                order: 1,
                name: 'Content Sizing',
                codeExample: '<div sytle="width: 100%"></div> instead of <div style="width: 300px"></div>',
                examples: {
                    div: {
                        name: 'Sizing Container Elements',
                        html: true,
                        css: true
                    },
                    img: {
                        name: 'Fluid Images',
                        html: true,
                        css: true
                    }
                }
            },
            mediaQueries: {
                order: 2,
                name: 'CSS Media Queries and Break Points',
                codeExample: '@media (max-width: 850px) and (min-width: 768px) { ... }',
                examples: {
                    min: {
                        name: 'Minimum Width',
                        html: true,
                        css: true
                    },
                    minAndMax: {
                        name: 'Mixing Min and Max Width',
                        html: true,
                        css: true
                    },
                    multiple: {
                        name: 'Phone, Tablet and Desktop Styling',
                        html: true,
                        css: true
                    }
                }
            },
            bootstrap: {
                order: 3,
                name: 'Bootstrap Grid',
                codeExample: '<div class="row"> <div class="col-sm-8"></div> <div class="col-sm-4"></div> </div>',
                examples: {
                    basic: {
                        name: 'Basic Grid',
                        html: true,
                        css: true
                    }
                }
            }
        })
        .config(['$routeProvider', 'sections' , function ($routeProvider, sections) {
            _.each(sections, function (section, key) {
                section.key = key;

                _.each(section.examples, function (example, key) {
                    example.key = key;
                });
            });

            var sortedSections = _.sortBy(_.values(sections), 'order');
            _.each(sortedSections, function (section) {
                _.each(section.examples, function (example) {
                    exampleCount++;

                    example.number = exampleCount;
                });
            });

            $routeProvider.when('/section/:sectionKey/:exampleKey', {
                templateUrl: 'examples/example.html',
                controller: 'ExampleCtrl'
            });

            $routeProvider.otherwise({redirectTo: '/home'});
        }])
        .run(['$rootScope', 'sections', function ($rootScope, sections) {
            $rootScope.sections = _.sortBy(_.values(sections), 'order');
            $rootScope.exampleCount = exampleCount;
        }]);
}());
