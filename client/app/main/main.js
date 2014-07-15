'use strict';

angular.module('dtmsgApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
          },
          'chat': {
            template: 'test',
            controller: 'ChatCtrl'
          },
          'user': {
            template: 'test',
            controller: 'UserCtrl'
          },
          'contact': {
            template: 'test',
            controller: 'ContactCtrl'
          },
          'option': {
            template: 'test',
            controller: 'OptionCtrl'
          }
        }
      });
  });