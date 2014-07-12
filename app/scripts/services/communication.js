'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Communication
 * @description
 * # Communication
 * Service in the rtmsgApp. Built into communication.js with telehash library using grunt-browserify task
 */
angular.module('rtmsgApp')
  .service('Communication', function Communication($q, $log, Telehash) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;

    this.session = null;

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

    this.listen = function() {
      var channelName = 'rtmsg';

      function packetHandler (err, packet, channel, callback) {
        if (err) return $log.error(err);

        $log.info(packet.js);

        callback(true);
      };

      self.session.listen(channelName, packetHandler);
      $log.info('listening');
    };

    this.send = function (id, message) {
      function packetHandler (err, packet, channel, callback) {
        if (err) return $log.error(err);

        $log.info(packet.js);
      };

      self.session.start(id, 'rtmsg', {js: {msg: message}}, packetHandler);
    };
  });