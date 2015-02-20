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
            var clients = {};
            $scope.clients = clients;

            io.on('clientAdded', function (client) {

            });

            io.on('clientUpdated', function (client) {
                console.log('clientUpdated', JSON.stringify(client));
                clients[client.name] = client;
                $scope.$apply();
            });

            io.on('clientRemoved', function (name) {
                delete clients[name];
                console.log('clientRemoved', name);
                $scope.$apply();
            });

            io.on('currentClients', function (clientList) {
                _.each(clientList, function (client) {
                    clients[client.name] = client;
                });
                $scope.$apply();
            });

            $scope.getStatusSummary = function (status) {
                var totalCount = 0,
                    statusCount = 0;

                _.each(clients, function (client) {
                    totalCount++;
                    if(client.feedback && client.feedback.status === status) {
                        statusCount++;
                    }
                });

                return Number(statusCount / totalCount * 100).toFixed(1);
            };

            $scope.resetStatuses = function () {
                io.emit('resetStatuses');
            };

            io.on('resetStatuses', function () {
                _.each(clients, function (client) {
                    client.feedback = null;
                });
                $scope.$apply();
            });
        }]);
}(io));
