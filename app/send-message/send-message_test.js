'use strict';

describe('Send Message', function () {

    describe('Send Message Controller', function () {
        var controller, fakeMessageService, fakeNameService, fakeGiftService;

        beforeEach(module('myApp.send-message'));

        beforeEach(inject(function ($controller, $q) {
            fakeMessageService = {
                getMessage: jasmine.createSpy().and.callFake(function () {
                    return $q.when();
                }),
                sendMessage: jasmine.createSpy().and.callFake(function () {
                    return $q.when();
                }),
                deleteMessage: jasmine.createSpy().and.callFake(function () {
                    return $q.when();
                })
            };
            fakeNameService = {
                queryName: jasmine.createSpy().and.callFake(function () {
                    return $q.when([
                        {
                            "name": "Hau"
                        }, {
                            "name": "Robin"
                        }
                    ]);
                })
            };
            fakeGiftService = {};

            controller = $controller('SendMessageController', {
                $q: $q,
                $routeParams: {},
                $location: {},
                MessageService: fakeMessageService,
                NameService: fakeNameService,
                GiftService: fakeGiftService
            });

        }));

        describe('when sending a message', function () {
            describe('with a gift', function () {
                it('should send the message via the MessageService with the correct parameters', function () {
                    controller.vm.messageParams.gift = 'car';
                    controller.vm.message = 'hello la';

                    controller.sendMessage();

                    expect(fakeMessageService.sendMessage).toHaveBeenCalledWith({ message: { gift: 'car' }, messageData: 'hello la' });
                });
            });

            describe('for a baby', function () {
                it('should send the message via the MessageService with the correct parameters', function () {
                    controller.vm.messageParams.birthday = '2017-01-01';
                    controller.vm.messageParams.name = 'hau';
                    controller.vm.message = 'hello la';

                    controller.sendMessage();

                    expect(fakeMessageService.sendMessage).toHaveBeenCalledWith({ message: { name: 'hau', birthday: '2017-01-01' }, messageData: 'hello la' });
                });
            });

            it('should delete the message via the message service', inject(function($rootScope) {
                controller.vm.inboxId = 10;
                
                controller.sendMessage();

                $rootScope.$digest();
                expect(fakeMessageService.deleteMessage).toHaveBeenCalledWith('inbox', 10);
            }));
        });

        describe('when selecting a name using the typeahead', function () {
            it('should update the view model with the name data', function () {
                controller.onSelectedNameChange('Bob');

                expect(controller.vm.messageParams.name).toEqual('Bob');
            });
        });

        describe('when selecting a name using the typeahead', function () {
            it('should update the view model with the gift data', function () {
                controller.vm.gifts = ['car'];

                controller.onGiftSelection(0);

                expect(controller.vm.messageParams.gift).toEqual('car');
            });
        });

        describe('when querying the names', function () {

            it('should return the names in a format suitable for display by the typeahead', inject(function ($rootScope) {
                var result;
                controller.queryName('la').then(function (data) {
                    result = data;
                });

                $rootScope.$digest();
                expect(result).toEqual([{
                    value: 'hau',
                    display: 'Hau'
                }, {
                    value: 'robin',
                    display: 'Robin'
                }]);
            }));
        });

        describe('when sending a birthday message', function () {
            describe('and the gift hasn\'t been selected yet', function () {
                it('the message should not be ready', function () {
                    expect(controller.isMessageReady()).toBe(false);
                });
            });

            describe('and the gift has been selected', function () {
                it('the message should not be ready', function () {
                    controller.vm.messageParams.gift = { gift: 'car' };
                    expect(controller.isMessageReady()).toBe(true);
                });
            });

        });

        describe('when sending a new baby message', function () {
            describe('and the baby details are not entered', function () {
                it('the message should not be ready', function () {
                    expect(controller.isMessageReady()).toBe(false);
                });
            });

            describe('and only the name has been entered', function () {
                it('the message should not be ready', function () {
                    controller.vm.messageParams.name = 'Toby';
                    expect(controller.isMessageReady()).toBe(false);
                });
            });

            describe('and only the DoB has been entered', function () {
                it('the message should not be ready', function () {
                    controller.vm.messageParams.birthday = '2017-01-01';
                    expect(controller.isMessageReady()).toBe(false);
                });
            });

            describe('and the baby details have been entered', function () {
                it('the message should not be ready', function () {
                    controller.vm.messageParams.name = 'Toby';
                    controller.vm.messageParams.birthday = '2017-01-01';
                    expect(controller.isMessageReady()).toBe(true);
                });
            });
        });

    });
});