'use strict';

angular.module('dtmsgApp')
  .controller('MainCtrl', function ($scope, Initialization, Configuration) {
    Initialization.initializationPromise = Initialization.initialize();
    $scope.initializationPromise = Initialization.initializationPromise;

    $scope.snapOptions = {
      touchToDrag: Configuration.dragEnabled
    };
  });