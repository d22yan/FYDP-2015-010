'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Identity
 * @description
 * # Identity
 * Service in the rtmsgApp.
 */
angular.module('rtmsgApp')
  .service('Identity', function Identity($rootScope, Storage, Communication) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.currentUser = Storage.read('user');

    this.createUser = function(user) {
      return Communication.initialize().then(function (newUser) {
        this.updateUser({
          id: newUser.hashname,
          keypair: newUser.id,
          name: user.name
        });
      }.bind(this));
    };

    this.updateUser = function(user) {
      this.currentUser = user;
      return Storage.save('user', user);
    };
  });
