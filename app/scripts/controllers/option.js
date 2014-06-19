'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:OptionCtrl
 * @description
 * # OptionCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('OptionCtrl', function ($scope) {
    $scope.modal = {
      title: 'Options',
      content: ''
    };
  });
