'use strict';

describe('Service: Cryptography', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Cryptography;
  beforeEach(inject(function (_Cryptography_) {
    Cryptography = _Cryptography_;
  }));

  it('should do something', function () {
    expect(!!Cryptography).toBe(true);
  });

});
