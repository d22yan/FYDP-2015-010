'use strict';

describe('Service: Constants', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Constants;
  beforeEach(inject(function (_Constants_) {
    Constants = _Constants_;
  }));

  it('should do something', function () {
    expect(!!Constants).toBe(true);
  });

});
