'use strict';

angular.module('myApp.dashboard', [
    'ngRoute', 
    'myApp.messages',
    'myApp.number-caption'
    ])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController as dc'
  });
}])
.controller('DashboardController', ['$q', 'MessageService', function($q, MessageService) {
    var vm = this;

    var refresh = function () {
        /**
         * In reality, these endpoints would be paginated so there would be a 
         * either a separate service call to retrive the number of messages or 
         * the number would be returned as meta data
         */
        MessageService.getMessages('sent').then(function (sentMessages) {
            vm.sentMessages = sentMessages;
        });
        MessageService.getMessages('inbox').then(function (inboxMessages) {
            vm.inboxMessages = inboxMessages;
        });
    }();

    return {
        vm: vm
    };

}]);