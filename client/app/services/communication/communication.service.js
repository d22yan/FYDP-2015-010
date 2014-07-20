'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($rootScope, $q, $log, Telehash, Constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.session = null;

    this.createChannelName = function (id1, id2) {
      var channelName = id1 < id2 ? id1 + id2 : id2 + id1;
      return Constants.channelName.prefix + channelName;
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

        var channelName = Constants.channelName.prefix + Constants.channelName.invite;

        //handles new invites
        function packetHandler (error, packet, channel, callback) {
          if (error) { return $log.error(error); }

          $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

          callback(true);
        }

        //listen for new invites
        this.session.listen(channelName, packetHandler);

        //verification by sending empty message to always-on seed
        //this.send(user, '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', '');

        $log.info('listening');
      }.bind(this)).catch(function(error) {
        $log.error('unable to start listening');
        $log.error(error);
      });
    };

    this.listen = function (user, contact, messages) {
      var deferredMessage = $q.defer();

      function packetHandler (error, packet, channel, callback) {
        if (error) { return deferredMessage.reject(error); }

        $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

        callback(true);

        deferredMessage.resolve(packet);
      }

      var channelName = this.createChannelName(contact.id, user.id);

      $log.info('listening to ' + contact.id);
      $log.info('on channel ' + channelName);

      this.session.listen(channelName, function (error, packet, channel, callback) {
        if (error) { return deferredMessage.reject(error); }

        callback(true);

        deferredMessage.resolve(packet);
      });

      deferredMessage.promise.then(function (packet) {
        $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

        //$rootScope.$apply(function () {
          if (packet.js.m) {
            messages.push({
              contact: packet.from.hashname,
              content: packet.js.m
            });
          } else if (packet.js.s) {
            contact.status = packet.js.s;
          }
        //});
      }).then(null, function(error) {
        $log.error('failed to listen to message');
        $log.error(error);
      });
    };

    this.send = function (user, contact, channelName, payload) {
      if (!this.session) { return $log.error('cannot send message: not connected to network'); }

      function packetHandler (error, packet, channel, callback) {
        if (error) {
          $log.error(error);
        }

        if (!contact.channel) {
          contact.channel = channel;
        }

        $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

        callback(true);
      }

      $log.info(JSON.stringify(payload) + ' to ' + contact.id);
      $log.info('sent on channel ' + channelName);

      if (!contact.channel) {
        this.session.start(contact.id, channelName, {js: payload}, packetHandler.bind(this));
      } else {
        contact.channel.send({js: payload});
      }
    };

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