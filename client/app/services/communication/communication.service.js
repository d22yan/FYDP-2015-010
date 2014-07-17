'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($q, $log, Telehash, Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.session = null;

    this.createChannelName = function (id1, id2) {
      var channelName = id1 < id2 ? id1 + id2 : id2 + id1;
      return 'dtmsg-' + channelName;
    };

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

        var channelName = 'dtmsg-invite';

        //handles new invites
        function packetHandler (error, packet, channel, callback) {
          if (error) return $log.error(error);

          $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

          callback(true);
        };

        //listen for new invites
        this.session.listen(channelName, packetHandler);

        //verification by sending empty message to always-on seed
        //this.send(user, '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', '');

        $log.info('listening');
      }.bind(this), function (error) {
        $log.error('unable to connect to network');
        $log.error(error);
      }).then(null, function(error) {
        $log.error('unable to start listening');
        $log.error(error);
      });
    }.bind(this);

    this.listen = function (user, contact, messages) {
      function packetHandler (error, packet, channel, callback) {
        if (error) return $log.error(error);

        $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

        callback(true);

        if (packet.js.m) {
          messages.push({
            contact: packet.from.hashname,
            content: packet.js.m
          });
        } else if (packet.js.s) {
          contact.status = packet.js.s;
        }
      };

      var channelName = this.createChannelName(contact.id, user.id);

      $log.info('listening to ' + contact.id);
      $log.info('on channel ' + channelName);

      this.session.listen(channelName, packetHandler);
    };

    this.send = function (user, contact, channelName, payload) {
      if (!this.session) return $log.error('cannot send message: not connected to network');

      function packetHandler (error, packet, channel, callback) {
        if (error) {
          $log.error(error);
          //reconnection on timeouts
          if (error === 'timeout') {

          }
          return;
        }

        $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

        callback(true);
      };

      $log.info(JSON.stringify(payload) + ' to ' + contact.id);
      $log.info('sent on channel ' + channelName);

      this.session.start(contact.id, channelName, {js: payload}, packetHandler.bind(this));
    }.bind(this);

    this.sendMessage = function (user, contact, message) {
      var payload = {
        m: message
      };

      this.send(user, contact, this.createChannelName(contact.id, user.id), payload);
    };

    this.sendStatusUpdate = function (user, contact, status) {
      var payload = {
        s: status
      };

      this.send(user, contact, this.createChannelName(contact.id, user.id), payload);
    };

    this.sendInvite = function (user, contact) {
      var payload = {
        i: user.name
      };

      this.send(user, contact, 'dtmsg-invite', payload);
    };
  });