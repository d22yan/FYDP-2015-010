'use strict';

describe('Filter: idToName', function () {

  // load the filter's module
  beforeEach(module('dtmsgApp'));

  // initialize a new instance of the filter before each test
  var idToName;
  beforeEach(inject(function ($filter) {
    idToName = $filter('idToName');
  }));

  it('should return the input prefixed with "idToName filter:"', function () {
    var text = 'angularjs';
    expect(idToName(text)).toBe('idToName filter: ' + text);
  });

});
