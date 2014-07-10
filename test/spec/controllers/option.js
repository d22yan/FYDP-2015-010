'use strict';

describe('Controller: OptionCtrl', function () {

  // load the controller's module
  beforeEach(module('rtmsgApp'));

  var OptionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OptionCtrl = $controller('OptionCtrl', {
      $scope: scope
    });
  }));

  it('should have a scope', function () {
    expect(scope).to.exist;
  });
});
