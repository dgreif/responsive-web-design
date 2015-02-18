(function (io) {
    'use strict';

    var feedback = {},
        io = io.connect('/client');

    io.on('feedback', function (feedback) {
        alert(JSON.stringify(feedback));
    });

    function getClientName() {
        return localStorage['clientName'] || '';
    }

    function setClientName(name) {
        name = name || '';
        localStorage['clientName'] = name;
        io.emit('setName', name);
    }

    function sendFeedbackStatus(to, options) {
        console.log('sending feedback:', to);
        io.emit('feedback', {
            status: to,
            options: options
        });
    }

    function clearStatuses() {
        feedback.isThumbsUp = false;
        feedback.isThumbsDown = false;

        sendFeedbackStatus(null);
    }


    feedback.thumbsUp = function () {
        var on = feedback.isThumbsUp;

        clearStatuses();

        if(!on) {
            feedback.isThumbsUp = true;

            sendFeedbackStatus('up');
        }
    };

    feedback.thumbsDown = function () {
        var on = feedback.isThumbsDown;

        clearStatuses();

        if(!on) {
            feedback.isThumbsDown = true;

            sendFeedbackStatus('down');
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
        }]);
}(io));