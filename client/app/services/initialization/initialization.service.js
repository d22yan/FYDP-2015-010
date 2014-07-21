'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization(
    $log, $interval, Identity, Communication, Storage, Configuration, Constants) {
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
          for (var contact in Identity.contacts) {
            if (contact === Identity.currentUser.id) {
              continue;
            }
            Communication.listen(Identity.currentUser, Identity.contacts[contact]);

            (function(contact) {
              var sendStatusUpdate = function() {
                Communication.sendStatusUpdate(Identity.currentUser, Identity.contacts[contact]).catch(function(error) {
                  if(error === Constants.errorTypes.timeout && Identity.contacts[contact].status !== Constants.userStatus.offline) {
                    Communication.sendStatusUpdate(Identity.currentUser, Identity.contacts[contact]).catch(function(error) {
                      Identity.contacts[contact].status = Constants.userStatus.offline;
                    });
                  }
                });
              };
              sendStatusUpdate();
              $interval(sendStatusUpdate, 15000);
            })(contact);
          }
        }.bind(this)).catch($log.error);
      }
      return connectPromise;
    };
  });
