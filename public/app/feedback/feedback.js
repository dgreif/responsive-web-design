(function () {
    'use strict';

    angular.module('rwd.feedback', [])
        .run(['$rootScope', '$http', function ($rootScope, $http) {
            var feedback = {};

            $rootScope.feedback = feedback;

            function clearStatuses() {
                feedback.isThumbsUp = false;
                feedback.isThumbsDown = false;
            }

            feedback.thumbsUp = function () {
                var on = feedback.isThumbsUp;

                clearStatuses();

                feedback.isThumbsUp = !on;
            };

            feedback.thumbsDown = function () {
                var on = feedback.isThumbsDown;

                clearStatuses();

                feedback.isThumbsDown = !on;
            };

            feedback.question = function () {
                var question = window.prompt("Ask a question:");

                if(question) {
                    alert('you asked: ' + question);
                }
            }
        }]);
}());