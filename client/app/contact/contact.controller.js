'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Initialization, Communication, Identity, Conversation, Constants, Time) {
    $scope.accordion = {
      open: true
    };

    $scope.contacts = Identity.contacts;

    $scope.open = function(conversation) {
      conversation.isOpen = true;
      conversation.isActive = true;
      conversation.lastOpened = Time.now();
    };

    $scope.newContactID = '';

    $scope.invite = function(id) {
      Conversation.conversations.push({
        id: id,
        isOpen: false, isActive: false, unreadCount: 0, messages: [], currentMessage: '',
        sendingPromise: {}, lastOpened: null
      });

      Identity.contacts.push({
        id: id, name: 'Invited',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation(id)
      });

      Communication.sendInvite(Identity.currentUser, Identity.getContact(id));

    };

    $scope.acceptInvite = function(contact) {
       Communication.sendInvite(Identity.currentUser, contact).then(
         function() {
            Communication.initializeContact(contact);
         }
       );
    };

    $scope.rejectInvite = function(contact) {
      Identity.removeContact(contact.id);
    };

  });