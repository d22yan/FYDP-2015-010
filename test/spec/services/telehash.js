'use strict';

describe('Service: Telehash', function () {

  // load the service's module
  beforeEach(module('rtmsgApp'));

  // instantiate service
  var Telehash;
  beforeEach(inject(function (_Telehash_) {
    Telehash = _Telehash_;
  }));

  it('should do something', function () {
    expect(!!Telehash).to.be.true;
  });

});
