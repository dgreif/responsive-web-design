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
            example = sections[sectionKey].examples[exampleKey],
            htmlFileName = example.html,
            cssFileName = example.css;

        $scope.section = sections[sectionKey];
        $scope.example = example;

        _.each(['html', 'css'], function (fileType) {
            if(example[fileType]) {
                $http.get('/app/' + sectionKey + '/' + exampleKey + '.' + fileType).success(function(resp) {
                    $scope['example_' + fileType] = resp;
                });
            }
        });
        //
        //$scope.aceLoaded = function(_editor) {
        //    // Options
        //    setTimeout(function() {
        //        _editor.resize();
        //    }, 2000);
        //};

        $scope.sendCode = function () {
            var html = $scope.example_html,
                css = $scope.example_css,
                name = $scope.name || '';

            name = name.trim();

            if(!name) {
                alert("Please enter your name in the upper right hand corner of the screen");
                return;
            }

            if(css) {
                html = html.replace('</head>', '<style type="text/css">' + css + '</style></head>');
            }

            $http.post('/client/' + encodeURI(name), html);
        }
    }]);