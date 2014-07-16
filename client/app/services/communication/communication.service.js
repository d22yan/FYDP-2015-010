'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($q, $log, Telehash) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.session = null;

    //generate new user with id and keypair
    this.initialize = function() {

      var deferredUser = $q.defer();

      Telehash.init({}, function (error, newUser) {
        if (error) { deferredUser.reject(error); }
        else { deferredUser.resolve(newUser); }
      });

      return deferredUser.promise;
    };

    //connect to network with existing user and start listening for messages
    this.connect = function(user) {
      $log.info('connecting to network');
      var deferredSession = $q.defer();

      Telehash.init({id: user.keypair}, function (error, newSession) {
        if (error) { deferredSession.reject(error); }
        else { deferredSession.resolve(newSession); }
      });

      return deferredSession.promise.then(function(newSession) {
        this.session = newSession;
        $log.info('new session established');
        $log.info(this.session);

        var channelName = 'dtmsg';

        function packetHandler (error, packet, channel, callback) {
          if (error) return $log.error(error);

          $log.info(packet.js);

          callback(true);
        };

        this.session.listen(channelName, packetHandler);
        $log.info('listening');
      }.bind(this), function (error) {
        $log.error('unable to connect to network');
        $log.error(error);
      }).then(null, function(error) {
        $log.error('unable to start listening');
        $log.error(error);
      });
    }.bind(this);

    this.send = function (user, id, message) {
      if (!this.session) return $log.error('cannot send message: not connected to network');

      function packetHandler (error, packet, channel, callback) {
        if (error) {
          $log.error(error);
          //reconnection on timeouts
          if (error === 'timeout') {
            this.connect(user);
            this.send(user, id, message);
          }
          return;
        }

        $log.info(packet.js);

        callback(true);
      };

      $log.info(JSON.stringify({msg: message}));
      this.session.start(id, 'dtmsg', {js: {msg: message}}, packetHandler.bind(this));
    }.bind(this);

    this.verify = function (user) {
      this.send(user, '24852a9f6b591629dbf29cbb7e507bd855ec78d38767a9a18acab4dbc7fd5224', '');
    }.bind(this);
  });