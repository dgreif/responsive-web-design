(function () {
    'use strict';

    angular.module('rwd.example', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/:sectionKey/:exampleKey', {
                templateUrl: 'examples/example.html',
                controller: 'ExampleCtrl'
            });
        }])
        .controller('ExampleCtrl', ['$scope', '$routeParams', 'sections', '$http', function ($scope, $routeParams, sections, $http) {
            var sectionKey = $routeParams.sectionKey,
                exampleKey = $routeParams.exampleKey,
                section = sections[sectionKey],
                examples = section.examples,
                example = examples[exampleKey],
                orderedSections = _.sortBy(_.values(sections), 'order'),
                orderedExamples = _.sortBy(_.values(examples), 'order'),
                sectionIndex = orderedSections.indexOf(section),
                exampleIndex = orderedExamples.indexOf(example);

            $scope.section = sections[sectionKey];
            $scope.example = example;

            if (exampleIndex !== orderedExamples.length - 1) {
                $scope.nextSection = section;
                $scope.nextExample = orderedExamples[exampleIndex + 1];
            } else if(sectionIndex !== orderedSections.length - 1) {
                var nextSection = orderedSections[sectionIndex + 1],
                    nextSectionExamples = _.sortBy(_.values(nextSection.examples), 'order');

                $scope.nextSection = nextSection;
                $scope.nextExample = nextSectionExamples[0];
            } else {
                $scope.finalExample = true;
            }

                _.each(['html', 'css'], function (fileType) {
                    if (example[fileType]) {
                        $http.get('/app/' + sectionKey + '/' + exampleKey + '.' + fileType).success(function (resp) {
                            $scope['example_' + fileType] = resp;
                        });
                    }
                });

            $scope.sendCode = function () {
                var html = $scope.example_html,
                    css = $scope.example_css,
                    name = $scope.user.name || '';

                name = name.trim();

                if (!name) {
                    alert("Please enter your name in the upper right hand corner of the screen");
                    return;
                }

                if (css) {
                    html = html.replace('</head>', '<style type="text/css">' + css + '</style></head>');
                }

                $http.post('/client/' + encodeURI(name), html);
            }
        }]);
}());