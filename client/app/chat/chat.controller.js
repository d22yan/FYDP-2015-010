'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity, Communication) {
    $scope.chats = Identity.contacts;

    $scope.send = function (id, message) {
      Communication.send(id, message);
    };
  });