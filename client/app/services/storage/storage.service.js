'use strict';

angular.module('dtmsgApp')
  .service('Storage', function Storage($log, Cryptography, localStorageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.storagePrefix = '';

    this.save = function (key, value) {
      var serializedValue = angular.toJson(value);
      var result = localStorageService.set(Cryptography.encrypt(this.storagePrefix + key), Cryptography.encrypt(serializedValue));

      if (!result) {
        $log.debug('failed to save key value pair: ' + this.storagePrefix + key + ', ' + serializedValue);
        return;
      }

      $log.info('saved key value pair: ' + this.storagePrefix + key + ', ' + serializedValue);

      return result;
    };

    this.read = function (key) {
      var value = localStorageService.get(Cryptography.encrypt(this.storagePrefix + key));

      if (!value) {
        $log.debug('failed to read key: ' + this.storagePrefix + key);
        return false;
      }

      $log.info('read key: ' + this.storagePrefix + key + ', ' + angular.toJson(value));

      return angular.fromJson(Cryptography.decrypt(value));
    };

    this.remove = function (key) {
      var result = localStorageService.remove(Cryptography.encrypt(this.storagePrefix + key));

      if (!result) {
        $log.debug('failed to remove key: ' + this.storagePrefix + key);
        return;
      }

      $log.info('removed key: ' + this.storagePrefix + key + ', ' + angular.toJson(result));

      return result;
    };

    this.savePlainText = function (key, value) {
      var serializedValue = angular.toJson(value);
      var result = localStorageService.set(key, serializedValue);

      if (!result) {
        $log.debug('failed to save key value pair: ' + key + ', ' + serializedValue);
        return;
      }

      $log.info('saved key value pair: ' + key + ', ' + serializedValue);

      return result;
    };

    this.readPlainText = function (key) {
      var value = localStorageService.get(key);

      if (!value) {
        $log.debug('failed to read key: ' + key);
        return;
      }

      $log.info('read key: ' + key + ', ' + angular.toJson(value));

      return value;
    };
  });