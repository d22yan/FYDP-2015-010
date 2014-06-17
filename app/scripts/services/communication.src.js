'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Communication
 * @description
 * # Communication
 * Service in the rtmsgApp. Built into communication.js with telehash library using grunt-browserify task
 */
angular.module('rtmsgApp')
  .service('Communication', function Communication($q, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var telehash = require('telehash');

    this.initialize = function() {
      //generate new user
      var deferred = $q.defer();

      telehash.init({}, function (error, newUser) {
        if (error) {
          deferred.reject(error);
        } else {
          var user = {
            id: newUser.hashname,
            keypair: newUser.id,
            name: 'Anonymous'
          };
          $log.info(user);

          deferred.resolve(user);
        }
      });

      return deferred.promise;
    };

    this.connect = function(user) {
      //initialize session with existing user
      var deferred = $q.defer();

      telehash.init({id: user.keypair}, function (error, newSession) {
        if (error) { deferred.reject(error); }
        else { deferred.resolve(newSession); }
      });

      return deferred.promise;
    };
  });