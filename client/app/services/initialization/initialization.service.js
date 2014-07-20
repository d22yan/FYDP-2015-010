'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization(
    $log, Identity, Communication, Storage, Conversation, Configuration, Constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var initialize = function () {
      var currentUser = Storage.read(Constants.storageKeys.Identity.currentUser);

      if (currentUser) {
        angular.copy(currentUser, Identity.currentUser);
      } else {
        angular.copy({ name: Constants.defaultUserName }, Identity.currentUser);
      }

      if (Identity.currentUser.keypair) {
        Communication.connect(Identity.currentUser).then(function() {
          for (var contact in Identity.contacts) {
            if (contact === Identity.currentUser.id) {
              continue;
            }
            Communication.listen(
              Identity.currentUser,
              Identity.contacts[contact],
              Conversation.conversations[contact].messages
            );
            Communication.sendStatusUpdate(
              Identity.currentUser,
              Identity.contacts[contact],
              Configuration.loginStatus
            );
          }
        }).catch(function(error) {
          $log.error('failed to listen to all conversations');
          $log.error(error);
        });
      }
    };

    initialize();

    this.reinitialize = initialize;
  });
