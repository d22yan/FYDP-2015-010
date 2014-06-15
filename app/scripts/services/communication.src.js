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
      return (function() {
        var deferred = $q.defer();

        telehash.init({}, function (error, keypair) {
          if (error) { deferred.reject(error); }
          else { deferred.resolve(keypair); }
        });

        return deferred.promise;
      }) ().then(function (keypair) {
          var deferred = $q.defer();

          telehash.init({id: keypair.id}, function (error, session) {
            if (error) { deferred.reject(error); }
            else { deferred.resolve(session); }
          });

          return deferred.promise;
        }, function (error) {
          return $log.error('failed to generate user keypair. msg: ' + error);
        }
      );
    };
  });