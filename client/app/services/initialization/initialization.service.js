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
              Communication.listen(Identity.currentUser, contact);

              var sendStatusUpdate = function() {
                Communication.sendStatus(Identity.currentUser, contact).catch(function(error) {
                  if(error === Constants.errorTypes.timeout && contact.status !== Constants.userStatus.offline) {
                    contact.status = Constants.userStatus.offline;
                  }
                });
              };
              sendStatusUpdate();
              $interval(sendStatusUpdate, 15000);
            })(contact);
          });
        }.bind(this)).catch($log.error);
      }
      return connectPromise;
    };
  });
