'use strict';

describe('Service: Communication', function () {

  // load the service's module
  beforeEach(module('rtmsgApp'));

  // instantiate service
  var Communication;
  beforeEach(inject(function (_Communication_) {
    Communication = _Communication_;
  }));

  it('should return session variable with expected parameters when initialized', function () {
    Communication.initialize().then(function (session) {
      expect(session.hashname).not.toBe(null);
    });
  });
});
