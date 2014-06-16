'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Communication
 * @description
 * # Communication
 * Service in the rtmsgApp. Built into communication.js with telehash library using grunt-browserify task
 */
angular.module('rtmsgApp')
  .service('Communication', function Communication($q, $log, Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var telehash = require('telehash');

    this.initialize = function() {
      var keypair = Storage.read('keypair');

      //TODO: refactor promise conversion into reusable function
      if (keypair) {
        //initialize session with existing keypair
        var deferred = $q.defer();

        telehash.init({id: keypair}, function (error, session) {
          if (error) { deferred.reject(error); }
          else { deferred.resolve(session); }
        });

        return deferred.promise;
      } else {
        return (function() {
          //generate new keypair
          var deferred = $q.defer();

          telehash.init({}, function (error, self) {
            if (error) { deferred.reject(error); }
            else { deferred.resolve(self); }
          });

          return deferred.promise;
        }) ().then(function (self) {
            //initialize session with new keypair and save to storage
            Storage.save('keypair', self.id);

            var deferred = $q.defer();

            telehash.init({id: self.id}, function (error, session) {
              if (error) { deferred.reject(error); }
              else { deferred.resolve(session); }
            });

            return deferred.promise;
          }, function (error) {
            return $log.error('failed to generate user keypair. msg: ' + error);
          }
        );
      }


    };
  });