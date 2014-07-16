'use strict';

describe('Service: Conversation', function () {

  // load the service's module
  beforeEach(module('dtmsgApp'));

  // instantiate service
  var Conversation;
  beforeEach(inject(function (_Conversation_) {
    Conversation = _Conversation_;
  }));

  it('should do something', function () {
    expect(!!Conversation).toBe(true);
  });

});
