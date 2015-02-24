'use strict';

// Declare app level module which depends on views, and components
angular.module('rwdAdmin', [
    'ngRoute',
    'rwdAdmin.home'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);