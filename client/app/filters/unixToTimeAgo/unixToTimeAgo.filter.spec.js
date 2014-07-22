'use strict';

describe('Filter: unixToTimeAgo', function () {

  // load the filter's module
  beforeEach(module('dtmsgApp'));

  // initialize a new instance of the filter before each test
  var unixToTimeAgo;
  beforeEach(inject(function ($filter) {
    unixToTimeAgo = $filter('unixToTimeAgo');
  }));

  it('should return the input prefixed with "unixToTimeAgo filter:"', function () {
    var text = 'angularjs';
    expect(unixToTimeAgo(text)).toBe('unixToTimeAgo filter: ' + text);
  });

});
