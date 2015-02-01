'use strict';

angular.module('rwd.section', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:key', {
            templateUrl: 'sections/section.html',
            controller: 'SectionCtrl'
        });
    }])
    .controller('SectionCtrl', ['$scope', '$routeParams', 'sections', function ($scope, $routeParams, sections) {
        var sectionKey = $routeParams.key;

        $scope.section = sections[sectionKey];
    }]);