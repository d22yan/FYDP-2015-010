'use strict';

describe('Service: telehash', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var telehash;
  beforeEach(inject(function (_telehash_) {
    telehash = _telehash_;
  }));

  it('should do something', function () {
    expect(!!telehash).toBe(true);
  });

});
