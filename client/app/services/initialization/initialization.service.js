'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization(
    $log, $interval, Identity, Communication, Storage, Configuration, Cryptography, Utility, Constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.initializationPromise = {};

    this.initializeNewUser = function (password) {
      Cryptography.passwordHash = angular.toJson(Cryptography.hash(password));

      angular.copy(Communication.initialize().then(function (newUser) {
        Cryptography.passwordSalt = newUser.hashname;

        return newUser;
      }).then(Identity.createUser)
        .then(this.initialize)
        .catch($log.error), this.initializationPromise);

      return this.initializationPromise;
    };

    this.initializeExistingUser = function (password) {
      Cryptography.passwordHash = Cryptography.hash(password);

      Communication.connect(Identity.currentUser);
    };

    this.initialize = function () {
      Identity.currentUser.status = Configuration.currentConfiguration.loginStatus;

      if (Identity.currentUser.keypair) {
        return Communication.connect(Identity.currentUser).then(function() {
          Utility.each(Identity.contacts, function(contact, index, contacts) {
            if (contact.id === Identity.currentUser.id) {
              return;
            }

            (function(contact) {
              Communication.initializeContact(contact);
            })(contact);
          });
        }).catch($log.error);
      }
    };
  });
