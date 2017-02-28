'use strict';

angular.module('myApp.messages', ['ngResource']).service('MessageService', ['$resource', function ($resource) {
    var messageResource = $resource('http://localhost:3004/messages/:folder/:id', {
        folder: '@folder',
        id: '@id'
    }, { 
        'getList': { method: 'GET', isArray: true },
        'get': { method: 'GET' },
        'send': {method: 'POST'},
        'delete': {method: 'DELETE'}
     });

    // Return the public API
    return {
        /**
         * Retrieves all of the messages from the specified folder
         * @param {string} folder - the folder to retrieve the messages from
         * @returns a promise to return the data from the folder
         */
        getMessages: function (folder) {
            return messageResource.getList({ folder: folder }).$promise;
        }, 
        /**
         * Retrieves a specific message from the specified folder
         * @param {any} folder - the folder to retrieve the message from
         * @param {number} messageId - the identifier of the message to retrieve
         * @returns a promise to return the specified message
         */
        getMessage: function(folder, messageId) {
            return messageResource.get({ folder: folder, id: messageId}).$promise;   
        }, 
        /**
         * Sends a message. In reality, this would post something to the backend
         * which would then do some processing. In this example app, I just post
         * all of the message data and the backend just stores it
         * @param {Object} messageData - the message data
         * @returns 
         */
        sendMessage: function(messageData) {
            return messageResource.send({ folder: 'sent'}, messageData).$promise;
        },
        /**
         * Deletes a message from the server.
         * @param {any} folder - the folder to delete the message from 
         * @param {any} messageId - the message identifier
         * @returns a promise on the deletion of the message
         */
        deleteMessage: function(folder, messageId) {
            return messageResource.delete({ folder: folder, id: messageId}).$promise;
        }
    };
}]);
