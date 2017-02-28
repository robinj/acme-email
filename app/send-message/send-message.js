'use strict';

angular.module('myApp.send-message', [
    'ngRoute',
    'myApp.messages',
    'myApp.message-type-filter',
    'myApp.greeting-card',
    'myApp.gifts',
    'myApp.names',
    'myApp.image-card'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/send-message/:id', {
            templateUrl: 'send-message/send-message.html',
            controller: 'SendMessageController as smc'
        });
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sent', {
            templateUrl: 'send-message/sent.html'
        });
    }])
    .controller('SendMessageController', ['$q', '$routeParams', '$location', 'MessageService', 'NameService', 'GiftService', function ($q, $routeParams, $location, MessageService, NameService, GiftService) {
        var vm = this;

        vm.errors = [];
        vm.messageParams = {};
        vm.inboxId = $routeParams.id;

        MessageService.getMessage('inbox', vm.inboxId).then(function (data) {
            return data || $q.reject('Invalid message identifier');
        }).then(function (messageData) {
            vm.message = messageData;
            return messageData;
        }).then(function (messageData) {
            if (messageData.type === 'birthday') {
                GiftService.getAllGifts().then(function (giftsData) {
                    vm.gifts = giftsData;
                });
            }
        }).catch(function (error) {
            vm.errors.push(error);
        });

        // Return the public API
        return {
            vm: vm,
            /**
             * Queries the name service for a typeahead 
             * @param {string} query - the name being searched for
             * @return {Object} selectedName - and object representing the name that has been selected
             * @return {string} selectedName.display - the person's actual name
             * @return {atring} selectedName.value - the HTML 'value' attribute representation of the person's name
             */
            queryName: function (query) {
                return NameService.queryName(query).then(function (returnedNames) {
                    return returnedNames.map(function (nameResource) {
                        return {
                            value: nameResource.name.toLowerCase(),
                            display: nameResource.name
                        };
                    });
                });
            },
            /**
             * Indicates whether the message is ready to be sent
             * @returns {boolean} - the message status 
             */
            isMessageReady: function () {
                return !!(vm.messageParams.name && vm.messageParams.birthday || vm.messageParams.gift);
            },
            /**
             * Event handler for when a name has been selected in the typeahead
             * @param {Object} selectedName - and object representing the name that has been selected
             * @param {string} selectedName.display - the person's actual name
             * @param {atring} selectedName.value - the HTML 'value' attribute representation of the person's name
             */
            onSelectedNameChange: function (selectedName) {
                vm.messageParams.name = selectedName;
            },
            /**
             * Event handler for when a gift has been selected. Sets the gift 
             * details in the view model
             * @param {number} id 
             */
            onGiftSelection: function (id) {
                vm.messageParams.gift = vm.gifts[id];
            },
            /**
             * Sends the message that has been constructed in the view model and
             * then deletes the message from the inbox 
             */
            sendMessage: function () {
                MessageService.sendMessage({ 'message': vm.messageParams, 'messageData': vm.message }).then(function () {
                    return MessageService.deleteMessage('inbox', vm.inboxId);
                }).then(function() {
                    $location.path('sent');
                })
                .catch(function () {
                    vm.errors.push('Unable to send message');
                });
            }
        };
    }]);