'use strict';

angular.module('dtmsgApp')
  .filter('unixToTimeAgo', function (Time) {
    return function (unixTime) {
      return unixTime ? Time.fromNow(unixTime).replace('in a few seconds', 'seconds ago').replace('a few ', '') : 'never';
    };
  });
