'use strict';

function getClientName() {
    return localStorage['clientName'] || '';
}

function setClientName(name) {
    localStorage['clientName'] = name || '';
}

// Declare app level module which depends on views, and components
angular.module('rwdAdmin', [
    'ngRoute',
    'rwdAdmin.home'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .run(['$rootScope', function ($rootScope) {
    }]);