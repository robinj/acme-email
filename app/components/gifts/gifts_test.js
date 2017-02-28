'use strict';

describe('Gifts Module', function () {
    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('Gifts Service', function () {

        beforeEach(module('myApp.gifts'));

        describe('when getting the gifts', function () {
            it('should retrieve the gifts from the gift backend', inject(function ($httpBackend, $rootScope, GiftService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/gifts').respond(200, [{ gift: 'toy car' }]);

                GiftService.getGifts().then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result[0].gift).toEqual('toy car');
            }));
        });

        describe('when getting the specials', function () {
            it('should retrieve the specials from the specials backend', inject(function ($httpBackend, $rootScope, GiftService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/specials').respond(200, [{ gift: 'diamond' }]);

                GiftService.getSpecials().then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result[0].gift).toEqual('diamond');
            }));
        });

        describe('when getting all of the gifts', function () {
            it('should retrieve a combination of all of the gifts from gifts and specials', inject(function ($httpBackend, $rootScope, GiftService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/specials').respond(200, [{ gift: 'diamond' }]);
                $httpBackend.expectGET('http://localhost:3004/gifts').respond(200, [{ gift: 'toy car' }]);

                GiftService.getAllGifts().then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result[0].gift).toEqual('diamond');
                expect(result[1].gift).toEqual('toy car');
            }));
        });
    });
});