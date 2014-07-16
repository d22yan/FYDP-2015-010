'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization($log, Identity, Communication, Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    Identity.currentUser = Storage.read('user');

    if (!Identity.currentUser) {
      Identity.currentUser = { name: 'New User' };
    }

    if (Identity.currentUser.keypair) {
      Communication.connect(Identity.currentUser).then(function() {
        Communication.verify(Identity.currentUser);
      });
    }
  });
