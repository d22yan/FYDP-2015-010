'use strict';

describe('Service: sjcl', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var sjcl;
  beforeEach(inject(function (_sjcl_) {
    sjcl = _sjcl_;
  }));

  it('should do something', function () {
    expect(!!sjcl).toBe(true);
  });

});
