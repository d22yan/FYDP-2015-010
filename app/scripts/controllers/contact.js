'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity) {
    $scope.accordion = {
      open: false
    };

    $scope.contacts = Identity.contacts;
  });
