(function (ioServer) {
    'use strict';

    var io = ioServer.connect('/admin');

    angular.module('rwdAdmin.home', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            });
        }])

        .controller('HomeCtrl', ['$scope', function ($scope) {
            $scope.clients = [];

            io.on('clientAdded', function (client) {
                clients.push(client);
            });

            io.on('feedback', function (feedback) {
                alert(JSON.stringify(feedback));
            })
        }]);
}(io));
