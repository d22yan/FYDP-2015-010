'use strict';

describe('Service: time', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var time;
  beforeEach(inject(function (_time_) {
    time = _time_;
  }));

  it('should do something', function () {
    expect(!!time).toBe(true);
  });

});
