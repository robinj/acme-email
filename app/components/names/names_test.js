'use strict';

describe('Names Module', function () {
    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('Name Service', function () {

        beforeEach(module('myApp.names'));

        describe('when getting a name', function () {
            it('should retrieve names from the names endpoint', inject(function ($httpBackend, $rootScope, NameService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/names?q=valerie').respond(200, [{ name: 'Valerie' }]);

                NameService.queryName('valerie').then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result[0].name).toEqual('Valerie');
            }));

        });

    });
});