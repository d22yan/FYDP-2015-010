'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity) {
    $scope.chats = Identity.contacts
  });
