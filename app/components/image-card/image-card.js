'use strict';

angular.module('myApp.image-card', []).directive('imageCard', function () {
    return {
        restrict: 'E',
        templateUrl: "components/image-card/image-card-directive.html",
        scope: {
            image: "@",
            title: "@",
            description: "@",
            index: "@",
            onSelect: "&"
        }
    };
}).directive('imageCardGrid', function () {
    return {
        restrict: 'E',
        templateUrl: "components/image-card/image-card-grid-directive.html",
        scope: {
            imageCards: "=",
            onSelect: "&"
        }
    };
});