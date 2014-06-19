'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.accordion = {
      open: false
    };

    $scope.contacts = [
      {id:'s9hqn489g7hb43q89r7bg8gq34t', name: 'contact1'},
      {id:'904bq87gbq348fbqa3097849432', name: 'contact2'},
      {id:'978432qgb8q37gb4587g43qb987', name: 'contact3'}
    ];

  });
