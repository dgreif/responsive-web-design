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

        $routeProvider.when('/tools', {
            templateUrl: 'landing/tools.html',
            controller: 'LandingCtrl'
        });

        $routeProvider.when('/credits', {
            templateUrl: 'landing/credits.html',
            controller: 'LandingCtrl'
        });
    }])

    .controller('LandingCtrl', [function() {

    }]);