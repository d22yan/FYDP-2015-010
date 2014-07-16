'use strict';

describe('Service: Initialization', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Initialization;
  beforeEach(inject(function (_Initialization_) {
    Initialization = _Initialization_;
  }));

  it('should do something', function () {
    expect(!!Initialization).toBe(true);
  });

});
