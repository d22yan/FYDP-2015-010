'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, $log, Identity, Communication, Time) {
    $scope.home = {
      isActive: true
    };

    $scope.user = Identity.currentUser;
    $scope.contacts = Identity.contacts;

    $scope.send = function (contact) {
      contact.conversation.sendingPromise = Communication.sendMessage(Identity.currentUser, contact).then(function(result) {
        $log.info(result);
        contact.conversation.messages.push({
          senderId: Identity.currentUser.id,
          content: contact.conversation.currentMessage
        });
        contact.conversation.currentMessage = '';
      }).catch($log.error);
    };

    $scope.close = function(conversation) {
      conversation.isOpen = false;
      conversation.isActive = false;
    };
  });