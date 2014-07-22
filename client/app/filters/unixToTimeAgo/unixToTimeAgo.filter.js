'use strict';

angular.module('dtmsgApp')
  .filter('unixToTimeAgo', function (Time) {
    return function (unixTime) {
      return unixTime ? Time.fromNow().replace('in a few seconds', 'just now').replace('a few ', '') : 'never';
    };
  });
