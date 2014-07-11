'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Communication
 * @description
 * # Communication
 * Service in the rtmsgApp. Built into communication.js with telehash library using grunt-browserify task
 */
angular.module('rtmsgApp')
  .service('Communication', function Communication($q, Telehash) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.initialize = function() {
      //generate new user
      var deferred = $q.defer();

      Telehash.init({}, function (error, newUser) {
        if (error) { deferred.reject(error); }
        else { deferred.resolve(newUser); }
      });

      return deferred.promise;
    };

    this.connect = function(user) {
      //initialize session with existing user
      var deferred = $q.defer();

      Telehash.init({id: user.keypair}, function (error, newSession) {
        if (error) { deferred.reject(error); }
        else { deferred.resolve(newSession); }
      });

      return deferred.promise;
    };
  });