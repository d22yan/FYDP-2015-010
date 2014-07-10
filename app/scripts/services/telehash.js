'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Telehash
 * @description
 * # Telehash
 * Factory in the rtmsgApp.
 */
angular.module('rtmsgApp')
  .factory('Telehash', function () {
    // Service logic
    // ...

    // Public API here
    return require('telehash');
  });
