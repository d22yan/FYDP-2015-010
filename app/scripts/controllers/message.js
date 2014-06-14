'use strict';

angular.module('rtmsgApp')
  .controller('MessageCtrl', function ($scope) {
    $scope.messages = [
      {sender:'lewis', content:'I\'m great'},
      {sender:'asif', content:'AngularJS is great'},
      {sender:'danny', content:'HTML5 is great'},
      {sender:'sang', content:'Bootstrap is great'}
    ];
  });
