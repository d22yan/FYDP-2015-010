'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization(
    $log, $interval, Identity, Communication, Storage, Configuration, Utility, Constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.initializationPromise = {};

    this.initialize = function () {
      var currentUser = Storage.read(Constants.storageKeys.Identity.currentUser);

      if (currentUser) {
        angular.copy(currentUser, Identity.currentUser);
        Identity.currentUser.status = Configuration.loginStatus;
      } else {
        angular.copy({ name: Constants.defaultUserName }, Identity.currentUser);
      }

      if (Identity.currentUser.keypair) {
        var connectPromise = Communication.connect(Identity.currentUser).then(function() {
          Utility.each(Identity.contacts, function(contact, index, contacts) {
            if (contact.id === Identity.currentUser.id) {
              return;
            }

            (function(contact) {
              Communication.initializeContact(contact);
            })(contact).bind(this);
          });
        }.bind(this)).catch($log.error);
      }
      return connectPromise;
    };
        
    
  });
