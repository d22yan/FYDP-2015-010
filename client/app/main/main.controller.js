'use strict';

angular.module('dtmsgApp')
  .controller('MainCtrl', function ($scope, Initialization) {
    Initialization.initializationPromise = Initialization.initialize();
    $scope.initializationPromise = Initialization.initializationPromise;

    $scope.snapOptions = {
      //disable: 'right'
    };
  });