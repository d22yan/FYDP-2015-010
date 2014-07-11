'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.snapOptions = {
      disable: 'right'
    };
  });
