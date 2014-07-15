'use strict';

describe('Service: Communication', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Communication;
  beforeEach(inject(function (_Communication_) {
    Communication = _Communication_;
  }));

  it('should do something', function () {
    expect(!!Communication).toBe(true);
  });

});
