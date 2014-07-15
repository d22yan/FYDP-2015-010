'use strict';

describe('Service: Identity', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Identity;
  beforeEach(inject(function (_Identity_) {
    Identity = _Identity_;
  }));

  it('should do something', function () {
    expect(!!Identity).toBe(true);
  });

});
