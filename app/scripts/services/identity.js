'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Identity
 * @description
 * # Identity
 * Service in the rtmsgApp.
 */
angular.module('rtmsgApp')
  .service('Identity', function Identity(Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.self = Storage.read('user');

    this.updateSelf = function(user) {
      this.self = user;
      return Storage.save('user', user);
    };
  });
