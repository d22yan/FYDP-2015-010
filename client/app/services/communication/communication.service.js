'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($rootScope, $q, $log, Telehash, Constants) {
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

    this.listen = function (user, contact, messages) {
      var deferredMessage = [];
      deferredMessage.push($q.defer());

      var channelName = this.createListenChannel(user.id, contact.id);

      var packetHandler = function (error, packet, channel, callback) {
        var currentMessage = deferredMessage.pop();
        deferredMessage.push($q.defer());

        if (error) {
          currentMessage.reject(error);
          return currentMessage.promise;
        }

        currentMessage.resolve(packet);
        callback(true);

        return currentMessage.promise;
      };

      $log.info('listening to ' + contact.id);
      $log.info('on channel ' + channelName);

      this.session.listen(channelName, function (error, packet, channel, callback) {
        packetHandler(error, packet, channel, callback).then(function(packet) {
          $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname + ' in listen'));

          if (packet.js.m) {
            messages.push({
              contact: packet.from.hashname,
              content: packet.js.m
            });
          } else if (packet.js.s) {
            contact.status = packet.js.s;
          }
        }).catch(function(error){
          $log.error('failed to listen to ' + contact.id);
          $log.error(error);
        });
      });
    };

    this.send = function (user, contact, channelName, payload) {
      var deferredMessage = [];
      deferredMessage.push($q.defer());

      if (!this.session) { return $log.error('cannot send message: not connected to network'); }

      var packetHandler = function (error, packet, channel, callback) {
        var currentMessage = deferredMessage.pop();
        deferredMessage.push($q.defer());

        if (error) {
          currentMessage.reject(error);
          return currentMessage.promise;
        }

        currentMessage.resolve(packet);
        callback(true);

        return currentMessage.promise;
      };

      $log.info(JSON.stringify(payload) + ' to ' + contact.id);
      $log.info('sent on channel ' + channelName);

      this.session.start(contact.id, channelName, {js: payload}, function (error, packet, channel, callback) {
        packetHandler(error, packet, channel, callback).then(function (packet) {
          $log.info(JSON.stringify(packet.js) + ' from ' + JSON.stringify(packet.from.hashname) + ' in send');
        }).catch(function (error) {
          $log.error('failed to send message to ' + contact.id);
          $log.error(error);
        });
      });
    };

    this.sendMessage = function (user, contact, message) {
      var payload = {
        m: message
      };

      this.send(user, contact, this.createSendChannel(user.id, contact.id), payload);
    };

    this.sendStatusUpdate = function (user, contact, status) {
      var payload = {
        s: status
      };

      this.send(user, contact, this.createSendChannel(user.id, contact.id), payload);
    };

    this.sendInvite = function (user, contact) {
      var payload = {
        i: user.name
      };

      this.send(user, contact, 'dtmsg-invite', payload);
    };
  });