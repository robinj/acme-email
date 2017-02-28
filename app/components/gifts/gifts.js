'use strict';

angular.module('myApp.gifts', ['ngResource']).service('GiftService', ['$resource', '$q', function ($resource, $q) {
    /**
     * I decided to pretend that both gifts and specials are the same but that
     * the specials come from a separate company or department. This is why they
     * have different endpoints
     */
    var giftResource = $resource('http://localhost:3004/gifts', {}, {
        'get': { method: 'GET', isArray: true }
    });

    var specialsResource = $resource('http://localhost:3004/specials', {}, {
        'get': { method: 'GET', isArray: true }
    });

    return {
        /**
         * Gets the gift inventory
         * @returns a promise to return a list of gifts
         */
        getGifts: function () {
            return giftResource.get().$promise;
        }, 
        /**
         * Gets the special gift inventory
         * @returns a promise to return a list of specials
         */
        getSpecials: function () {
            return specialsResource.get().$promise;
        }, 
        /**
         * Gets all gifts and special gifts 
         * @returns a promise to return a list of all gifts
         */
        getAllGifts: function () {
            return $q.all([this.getSpecials(), this.getGifts()]).then(function (giftArrays) {
                // Flatten the arrays
                return giftArrays.reduce(function (a, b) {
                    return a.concat(b);
                });
            });
        }
    };
}]);