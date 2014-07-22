'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, $log, Identity, Communication, Time) {
    $scope.home = {
      isActive: true
    };

    $scope.user = Identity.currentUser;
    $scope.contacts = Identity.contacts;

    $scope.send = function (contact) {
      contact.conversation.sendingPromise = Communication.sendMessage(Identity.currentUser, contact);
    };

    $scope.close = function(conversation) {
      conversation.isOpen = false;
      conversation.isActive = false;
    };
  });