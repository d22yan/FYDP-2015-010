'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($rootScope, $q, $log, Telehash, Constants, Time) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.session = null;
    this.inviteChannel = null;

    this.createSendChannel = function (userId, contactId) {
      var channelName = userId + contactId;
      return Constants.channelName.prefix + channelName;
    };

    this.createListenChannel = function (userId, contactId) {
      var channelName = contactId + userId;
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

          if (!this.inviteChannel) {
            this.inviteChannel = channel;
          }

          callback(true);
        }

        //listen for new invites
        this.session.listen(channelName, packetHandler.bind(this));

        //verification by sending empty message to always-on seed
        //this.send(user, '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', '');

        $log.info('listening');
      }.bind(this)).catch(function(error) {
        $log.error('unable to start listening');
        $log.error(error);
      });
    };

    this.listen = function (user, contact) {


      var channelName = this.createListenChannel(user.id, contact.id);

      var packetHandler = function (error, packet, channel, callback) {
        var deferredMessage = $q.defer();

        if (error) {
          return deferredMessage.reject('failed to listen to ' + contact.id + ' due to: ' + error);
        }

        deferredMessage.resolve(packet);
        callback(true);
        channel.send();

        return deferredMessage.promise;
      };

      $log.info('listening to ' + contact.id);
      $log.info('on channel ' + channelName);

      this.session.listen(channelName, function (error, packet, channel, callback) {
        packetHandler(error, packet, channel, callback).then(function(packet) {
          $log.info('received ' + JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname));

          if (packet.js.m) {
            contact.conversation.messages.push({
              time: packet.js.t,
              from: packet.from.hashname,
              message: packet.js.m,
              read: false || contact.conversation.isActive
            });
          } else if (packet.js.s) {
            contact.status = packet.js.s;
          }

          contact.lastUpdate = packet.js.t;
        }).catch($log.error);
      });
    };

    this.send = function (user, contact, channelName, payload) {
      var deferredMessage = $q.defer();

      if (!this.session) { return $log.error('cannot send message: not connected to network'); }

      var packetHandler = function (error, packet, channel, callback) {
        if (error) {
          $log.error('failed to send ' + JSON.stringify(payload) + ' to ' + contact.id + ' due to: ' + error);
          return deferredMessage.reject(error);
        }

        callback(true);
        $log.info('sent ' + JSON.stringify(packet.js) + ' to ' + packet.from.hashname);
        return deferredMessage.resolve(packet);
      };

      $log.info(JSON.stringify(payload) + ' to ' + contact.id);
      $log.info('sent on channel ' + channelName);

      this.session.start(contact.id, channelName, {js: payload}, packetHandler);
      return deferredMessage.promise;
    };

    this.sendMessage = function (user, contact) {
      var currentTime = Time.now();
      var payload = {
        t: Time.now(),
        m: contact.conversation.currentMessage
      };

      return this.send(user, contact, this.createSendChannel(user.id, contact.id), payload).then(function(packet) {
        $log.info(packet);
        contact.conversation.messages.push({
          time: currentTime,
          from: user.id,
          message: contact.conversation.currentMessage,
          read: true
        });
        contact.conversation.currentMessage = '';
      }).catch($log.error);
    };

    this.sendStatus = function (user, contact) {
      var payload = {
        t: Time.now(),
        s: user.status
      };

      return this.send(user, contact, this.createSendChannel(user.id, contact.id), payload);
    };

    this.sendInvite = function (user, contact) {
      var payload = {
        t: Time.now(),
        i: user.name
      };

      return this.send(user, contact, 'dtmsg-invite', payload);
    };
  });