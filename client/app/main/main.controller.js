'use strict';

angular.module('dtmsgApp')
  .controller('MainCtrl', function ($scope, Initialization, Configuration) {
    $scope.snapOptions = {
      touchToDrag: Configuration.currentConfiguration.dragEnabled
    };
  });