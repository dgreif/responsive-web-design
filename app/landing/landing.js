'use strict';

angular.module('rwd.landing', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        console.log('made it!')

        $routeProvider.when('/home', {
            templateUrl: 'landing/landing.html',
            controller: 'LandingCtrl'
        });
    }])

    .controller('LandingCtrl', [function() {

    }]);