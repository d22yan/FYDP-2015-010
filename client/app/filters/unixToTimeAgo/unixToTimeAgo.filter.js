'use strict';

angular.module('dtmsgApp')
  .filter('unixToTimeAgo', function (Time) {
    return function (unixTime) {
      return unixTime ? Time.fromNow().replace('a few ', '') : 'Never';
    };
  });
