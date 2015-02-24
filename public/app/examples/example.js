(function () {
    'use strict';

    function resizeAceEditors(aceEditors) {
        _.each(aceEditors, function (aceEditor) {
            aceEditor.setOption('maxLines', 200);
        });
    }

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
                exampleIndex = orderedExamples.indexOf(example),
                aceEditors = [];

            $scope.section = sections[sectionKey];
            $scope.example = example;

            if (exampleIndex !== orderedExamples.length - 1) {
                $scope.nextSection = section;
                $scope.nextExample = orderedExamples[exampleIndex + 1];
            } else if (sectionIndex !== orderedSections.length - 1) {
                var nextSection = orderedSections[sectionIndex + 1],
                    nextSectionExamples = _.sortBy(_.values(nextSection.examples), 'order');

                $scope.nextSection = nextSection;
                $scope.nextExample = nextSectionExamples[0];
            } else {
                $scope.finalExample = true;
            }

            $scope.sendCode = function () {
                var html = example.userCode.html,
                    css = example.userCode.css,
                    name = $scope.user.name || '';

                name = name.trim();

                if (!name) {
                    setTimeout(function () {
                        alert("Please enter your name in the upper right hand corner of the screen");
                    });
                    return;
                }

                if (css) {
                    html = html.replace('</head>', '<style type="text/css">' + css + '</style></head>');
                }

                $http.post('/client/' + encodeURI(name), html);
            };

            if (!example.defaultCode) {
                example.defaultCode = {};
                example.userCode = {};

                _.each(['html', 'css'], function (fileType) {
                    if (example[fileType]) {
                        $http.get('/app/' + sectionKey + '/' + exampleKey + '.' + fileType).success(function (resp) {
                            example.defaultCode[fileType] = resp;
                            example.userCode[fileType] = resp;

                            resizeAceEditors(aceEditors);
                            $scope.sendCode();
                        });
                    }
                });
            } else {
                $scope.sendCode();
            }

            $scope.resetExample = function () {
                _.each(example.defaultCode, function (code, fileType) {
                    example.userCode[fileType] = code;
                });
            };

            $scope.aceLoaded = function (aceEditor) {
                aceEditors.push(aceEditor);
                resizeAceEditors(aceEditors);
            };
        }]);
}());