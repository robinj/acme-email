'use strict';

angular.module('myApp.names', ['ngResource']).service('NameService', ['$resource', function ($resource) {
    var nameResource = $resource('http://localhost:3004/names', {}, { 
        'get': { method: 'GET', isArray: true } 
    });

    // Return the public API
    return {
        /**
         * Searches the name backend for the given name (or part thereof)
         * @param {String} name - the name being searched for
         * @returns a promise to return a list of names
         */
        queryName: function(name) {
            return nameResource.get({ q: name}).$promise;
        }
    };
}]);