'use strict';

describe('Controller: MessageCtrl', function () {

  // load the controller's module
  beforeEach(module('rtmsgApp'));

  var MessageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessageCtrl = $controller('MessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of messages to the scope', function () {
    expect(scope.messages.length).toBe(4);
  });
});
