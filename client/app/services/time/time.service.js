'use strict';

angular.module('dtmsgApp')
  .service('Time', function Time($log, $moment) {
    // Service logic
    // ...

    // Public API here
    this.now = function () {
      return (new $moment()).valueOf();
    };
  });
