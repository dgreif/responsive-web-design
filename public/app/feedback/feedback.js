(function (io) {
    'use strict';

    var feedback = {},
        io = io.connect('/controller');

    function getClientName() {
        return localStorage['clientName'] || '';
    }

    function setClientName(name) {
        name = name || '';
        localStorage['clientName'] = name;
        io.emit('setName', name);
        clearStatuses();
    }

    function sendFeedbackStatus(to, options) {
        console.log('sending feedback:', to);
        io.emit('feedback', {
            status: to,
            options: options
        });
    }

    function clearStatuses() {
        feedback.status = null;
        sendFeedbackStatus(null);
    }

    feedback.thumbsUp = function () {
        if(feedback.status !== 'up') {
            feedback.status = 'up';

            sendFeedbackStatus('up');
        } else {
            clearStatuses();
        }
    };

    feedback.thumbsDown = function () {
        if(feedback.status !== 'down') {
            feedback.status = 'down';

            sendFeedbackStatus('down');
        } else {
            clearStatuses();
        }
    };

    feedback.question = function () {
        var question = window.prompt("Ask a question:");

        if (question) {
            alert('you asked: ' + question);
        }
    };

    angular.module('rwd.feedback', [])
        .run(['$rootScope', '$http', function ($rootScope, $http) {
            $rootScope.feedback = feedback;

            function subscribeToIOEvents(io) {
                io.on('answer', function (clientName) {
                    // do stuff
                });
            }

            subscribeToIOEvents(io);

            $rootScope.$on('$routeChangeSuccess', clearStatuses);

            $rootScope.name = getClientName();

            if($rootScope.name) {
                setClientName($rootScope.name);
            }

            $rootScope.$watch('name', function (name) {
                setClientName(name);
            });

            io.on('feedback', function (feedbackFromServer) {
                feedback.status = feedbackFromServer.status;
                $rootScope.$apply();
            });
        }]);
}(io));