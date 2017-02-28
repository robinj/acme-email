'use strict';

angular.module('myApp.greeting-card', ['ngResource']).directive('greetingCard', function() {
    return {
        restrict: 'E',
        templateUrl: "components/greeting-card/greeting-card-directive.html",
        scope: {
            type: "@",
            parameters: "="
        }
    };
});