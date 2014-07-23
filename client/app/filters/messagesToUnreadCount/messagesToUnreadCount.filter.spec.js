'use strict';

describe('Filter: messagesToUnreadCount', function () {

  // load the filter's module
  beforeEach(module('dtmsgApp'));

  // initialize a new instance of the filter before each test
  var messagesToUnreadCount;
  beforeEach(inject(function ($filter) {
    messagesToUnreadCount = $filter('messagesToUnreadCount');
  }));

  it('should return the input prefixed with "messagesToUnreadCount filter:"', function () {
    var text = 'angularjs';
    expect(messagesToUnreadCount(text)).toBe('messagesToUnreadCount filter: ' + text);
  });

});
