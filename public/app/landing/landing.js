'use strict';

angular.module('rwd.landing', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'landing/landing.html',
            controller: 'LandingCtrl'
        });

        $routeProvider.when('/definition', {
            templateUrl: 'landing/definition.html',
            controller: 'LandingCtrl'
        });
    }])

    .controller('LandingCtrl', [function() {

    }]);