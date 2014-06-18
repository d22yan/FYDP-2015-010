'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
