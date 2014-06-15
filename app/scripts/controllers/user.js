'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, Communication) {
    $scope.createUser = function() {
      Communication.initialize({}, function (error, keypair) {
        if(error) { return console.error('failed to generate user keypair'); }

        console.dir(keypair.id);

        Communication.initialize({id: keypair.id}, function (error, user) {
          if(error) { return console.error('failed to generate user hashname'); }

          console.dir(user.hashname);
          $scope.id = user.hashname;
        });
      });
    };
  });
