'use strict';

angular.module('myApp.message-type-filter', ['ngResource']).filter('messageType', function () {
    return function (input) {
        var output; 

        switch (input) {
            case 'birthday':
                output = "Birthday";
                break; 
            case 'newBaby':
                output = "New Baby";
                break;
            default:
                output = "Unknown";
        }
        return output; 
    };
});