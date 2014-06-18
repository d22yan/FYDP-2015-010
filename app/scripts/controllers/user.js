'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Communication, Identity) {
    if (!Identity.self) {
      Identity.updateSelf({ name: 'New User' });
    }
    $scope.user = Identity.self;

    $scope.createUser = function() {
      Communication.initialize().then(function (newUser) {
        var user = {
          id: newUser.hashname,
          keypair: newUser.id,
          name: $scope.user.name
        };

        $log.info(user);

        Identity.updateSelf(user);
        $scope.user = Identity.self;
      }, function (error) {
        $log.error(error);
      });
    };

    $scope.saveUser = function() {
      Identity.updateSelf($scope.user);
    };
  });
