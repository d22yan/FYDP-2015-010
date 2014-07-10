'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('rtmsgApp'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      $scope: scope
    });
  }));

  it('should have a scope', function () {
    expect(scope).to.exist;
  });
});
