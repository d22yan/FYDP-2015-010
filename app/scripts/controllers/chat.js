'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity, Communication) {
    $scope.chats = Identity.contacts;

    $scope.send = function (id, message) {
      Communication.send(id, message);
    };
  });
