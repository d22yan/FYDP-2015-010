'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Communication, Storage) {
    var existingUser = Storage.read('user');

    if (!existingUser) {
      $scope.user = { name: 'New User' };
    } else {
      $scope.user = existingUser;
    }

    $scope.createUser = function() {
      Communication.initialize().then(saveUser);
    };

    function saveUser(user) {
      $log.info(user);
      //TODO: investigate databinding bug here
      $scope.user = user;
      Storage.save('user', user);
    }
  });
