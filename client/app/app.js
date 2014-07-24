'use strict';

angular.module('dtmsgApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'LocalStorageModule',
  'ngClickSelect',
  'angular-underscore',
  'angular-momentjs',
  'snap',
  'cgBusy'
])
  .config(function ($routeProvider, $locationProvider, localStorageServiceProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    localStorageServiceProvider.setPrefix('dtmsg');
  });