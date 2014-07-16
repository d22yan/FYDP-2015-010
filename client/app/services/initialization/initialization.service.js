'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization($log, Identity, Communication, Storage, Conversation) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    Identity.currentUser = Storage.read('user');

    if (!Identity.currentUser) {
      Identity.currentUser = { name: 'New User' };
    }

    if (Identity.currentUser.keypair) {
      Communication.connect(Identity.currentUser).then(function() {
        for (var conversation in Conversation.conversations) {
          Communication.listen(Identity.currentUser, conversation, conversation.messages);
          Communication.sendStatusUpdate(Identity.currentUser, conversation, 'online');
        }
      }).then(null, function(error) {
          $log.error('failed to listen to all conversations');
          $log.error(error);
      });
    }


  });
