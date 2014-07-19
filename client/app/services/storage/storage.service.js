'use strict';

angular.module('dtmsgApp')
  .service('Storage', function Storage($log, Cryptography, localStorageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.save = function (key, value) {
      var result = localStorageService.set(Cryptography.encrypt(key), Cryptography.encrypt(value));

      if (!result) { $log.debug('failed to save key value pair: ' + key + ', ' + JSON.stringify(value)); }
      else { $log.info('saved key value pair: ' + key + ', ' + JSON.stringify(value)); }

      return result;
    };

    this.read = function (key) {
      var value = Cryptography.decrypt(localStorageService.get(Cryptography.encrypt(key)));

      if (!value) { $log.debug('failed to read key: ' + key); }
      else { $log.info('read key: ' + key + ', ' + JSON.stringify(value)); }

      return value;
    };
  });