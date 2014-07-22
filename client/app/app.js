'use strict';

angular.module('dtmsgApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'LocalStorageModule',
  'ngClickSelect',
  'angular-underscore',
  'angularMoment',
  'angular-momentjs',
  'snap',
  'cgBusy'
])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('dtmsg');
  }])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });