'use strict';

describe('Messages Module', function () {
    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('Message Service', function () {

        beforeEach(module('myApp.messages'));

        describe('when getting the message list', function () {
            it('should retrieve messages from the folder provided', inject(function ($httpBackend, $rootScope, MessageService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/messages/inbox').respond(200, [{ text: 'hello' }]);

                MessageService.getMessages('inbox').then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result[0].text).toEqual('hello');
            }));

        });
        describe('when retrieving an individual message', function () {
            it('should retrieve messages from the folder provided', inject(function ($httpBackend, $rootScope, MessageService) {
                var result;
                $httpBackend.expectGET('http://localhost:3004/messages/inbox/1').respond(200, { text: 'hello' });

                MessageService.getMessage('inbox', 1).then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result.text).toEqual('hello');
            }));
        });

        describe('when sending a message', function () {
            it('should post the message payload to the send folder', inject(function ($httpBackend, $rootScope, MessageService) {
                var result;
                $httpBackend.expectPOST('http://localhost:3004/messages/sent', {text: 'hi'}).respond(200, { text: 'hello' });

                MessageService.sendMessage({text: 'hi'}).then(function (data) {
                    result = data;
                });

                $httpBackend.flush();
                expect(result.text).toEqual('hello');
            }));
        });
    });
});