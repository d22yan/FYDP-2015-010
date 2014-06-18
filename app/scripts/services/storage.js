'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Storage
 * @description
 * # Storage
 * Service in the rtmsgApp.
 */
angular.module('rtmsgApp')
  .service('Storage', function Storage($log, localStorageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.save = function (id, data) {
      var result = localStorageService.set(id, data);

      if (!result) { $log.debug('failed to save id data pair: ' + id + ', ' + JSON.stringify(data)); }
      else { $log.info('saved id data pair: ' + id + ', ' + JSON.stringify(data)); }

      return result;
    };

    this.read = function (id) {
      var data = localStorageService.get(id);

      if (!data) { $log.debug('failed to read id: ' + id); }
      else { $log.info('read id: ' + id + ', ' + data); }

      return data;
    };
  });
