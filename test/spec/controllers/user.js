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

  it('should attach user id to scope when creating new user', function () {
    scope.createUser();
    expect(scope.id).not.toBe(null);
  });

  it('should store user id to storage service when creating new user', function () {

  });
});
