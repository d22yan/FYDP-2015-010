'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, $log, Identity, Communication, Utility, Time) {
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

    Utility.each(Identity.contacts, function(contact){
        $scope.$watch(
            function(){
                return contact.conversation.isActive;
            },
            function(isActive){
                if (!isActive) {
                    return;
                }
                Utility.each(contact.conversation.messages, function(message){
                    if(!message.read){
                        message.read = true;
                    }
                });
            }
        );
    });
    /*
    $scope.$watch(
        function(){},
    );*/
  });