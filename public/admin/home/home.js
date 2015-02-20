(function (ioServer) {
    'use strict';

    var io = ioServer.connect('/admin'),
        questionKey = 1;

    function getKeyFromQuestion(question) {
        if (question.key) {
            return question.key;
        }

        question.key = questionKey++;

        return question.key;
    }

    angular.module('rwdAdmin.home', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            });
        }])

        .controller('HomeCtrl', ['$scope', function ($scope) {
            var clients = {},
                questions = {};

            $scope.clients = clients;
            $scope.questions = questions;

            io.on('clientAdded', function (client) {

            });

            io.on('clientUpdated', function (client) {
                clients[client.name] = client;
                $scope.$apply();
            });

            io.on('clientRemoved', function (name) {
                delete clients[name];
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
                    if (client.feedback && client.feedback.status === status) {
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

            io.on('question', function (question) {
                var key = getKeyFromQuestion(question);
                questions[key] = question;
                $scope.$apply();
            });

            $scope.removeQuestion = function (question) {
                delete questions[getKeyFromQuestion(question)];
            };

            $scope.getQuestions = function () {
                return _.values(questions);
            };

            $scope.getClientCount = function () {
                return _.keys(clients).length;
            }
        }]);
}(io));
