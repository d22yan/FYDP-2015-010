'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Initialization, Communication, Identity, Conversation, Constants, Time) {
    $scope.accordion = {
      open: true
    };

    $scope.contacts = Identity.contacts;

    $scope.open = function(conversation) {
      conversation.lastOpened = Time.now();
      conversation.isOpen = true;
      conversation.isActive = true;
    };

    $scope.newContactID = '';

    $scope.invite = function(id) {
      Identity.inviteContact(id);
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