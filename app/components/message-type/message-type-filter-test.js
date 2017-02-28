'use strict';

describe('message type filter', function () {

    beforeEach(module('myApp.message-type-filter'));

    it('should replace "birthday" with "Birthday"', inject(function (messageTypeFilter) {
        expect(messageTypeFilter('birthday')).toEqual('Birthday');
    }));

    it('should replace "newBaby" with "New Baby"', inject(function (messageTypeFilter) {
        expect(messageTypeFilter('newBaby')).toEqual('New Baby');
    }));

    it('should default to "Unknown"', inject(function (messageTypeFilter) {
        expect(messageTypeFilter('blablabla')).toEqual('Unknown');
    }));

});