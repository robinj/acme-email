'use strict';

angular.module('myApp.number-caption', []).directive('numberCaption', [function() {
    return{
        restrict: 'E',
        templateUrl: "components/number-caption/number-caption-directive.html",
        scope: {
            number: "@",
            caption: "@"
        }
    };
}]);