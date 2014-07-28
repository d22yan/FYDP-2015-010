'use strict';

angular.module('dtmsgApp')
  .service('Communication', function Communication($rootScope, $q, $log, Identity, Conversation, Telehash, Constants, Time, Utility,$interval) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.session = null;

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

        var inviteChannel = Constants.channelName.prefix + Constants.channelName.invite;

        //handles new invites
        function packetHandler (error, packet, channel, callback) {
          var deferredInvite = $q.defer();
          if (error) {
            deferredInvite.reject('failed to listen to invites due to: ' + error);
            return deferredInvite.promise;
          }

          $log.info('received ' + angular.toJson(packet.js) + ' from ' + angular.toJson(packet.from.hashname));

          deferredInvite.resolve(packet);
          callback(true);
          channel.send();

          return deferredInvite.promise;
        }

        //listen for new invites
        this.session.listen(inviteChannel, function (error, packet, channel, callback) {
          packetHandler(error, packet, channel, callback).then(function(packet) {
            if (!packet.js.i) {
              return $log.info('received non-invite packet on invite channel');
            }
            
            var existingContact = Identity.getContact(packet.from.hashname);
            if (existingContact) {
              if(existingContact.status === Constants.userStatus.invited) {
                this.initializeContact(existingContact);
                existingContact.name = packet.js.i;
                existingContact.status = Constants.userStatus.online;
                Identity.updateContact(existingContact);
              }
              return $log.info('received invite from existing contact: ' + packet.from.hashname);
            }

            var newContact = Identity.addContact(packet.from.hashname);
            newContact.name = packet.js.i;
            newContact.status = Constants.userStatus.invite;

            Identity.updateContact(newContact);
          }.bind(this));
        }.bind(this));

        //verification by sending empty message to always-on seed
        //this.send(user, '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', '');

        $log.info('listening');
      }.bind(this)).catch(function(error) {
        $log.error('unable to start listening');
        $log.error(error);
      });
    };
    
    this.initializeContact = function(contact) {
      $rootScope.$watch(
        function(){
          return contact.conversation.isActive;
        },
        function(isActive){
          if (!isActive) {
            return;
          }
          Utility.each(contact.conversation.messages, function(message){
            if(!message.read){
              message.read = true;
            }
          });
        }
      );

      this.listen(Identity.currentUser, contact);
      var sendStatusUpdate = function() {
        this.sendStatus(Identity.currentUser, contact).catch(function(error) {
          if(error === Constants.errorTypes.timeout && 
              contact.status !== Constants.userStatus.offline && 
              contact.status !== Constants.userStatus.invited) {
            contact.status = Constants.userStatus.offline;
            Identity.updateContact(contact);
          }
        });
      }.bind(this);
      sendStatusUpdate();
      $interval(sendStatusUpdate, 15000);
    };

    this.listen = function (user, contact) {
      var channelName = this.createListenChannel(user.id, contact.id);

      var packetHandler = function (error, packet, channel, callback) {
        var deferredMessage = $q.defer();

        if (error) {
          deferredMessage.reject('failed to listen to ' + contact.id + ' due to: ' + error);
          return deferredMessage.promise;
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
          $log.info('received ' + angular.toJson(packet.js) + ' from ' + angular.toJson(packet.from.hashname));

          if (packet.js.m) {
            contact.conversation.messages.push({
              time: packet.js.t,
              from: packet.from.hashname,
              message: packet.js.m,
              read: contact.conversation.isActive
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
          $log.error('failed to send ' + angular.toJson(payload) + ' to ' + contact.id + ' due to: ' + error);
          return deferredMessage.reject(error);
        }

        callback(true);
        $log.info('sent ' + angular.toJson(packet.js) + ' to ' + packet.from.hashname);
        return deferredMessage.resolve(packet);
      };

      $log.info(angular.toJson(payload) + ' to ' + contact.id);
      $log.info('sent on channel ' + channelName);

      try{
        this.session.start(contact.id, channelName, {js: payload}, packetHandler);
      } catch(error) {
        $log.error(error);
        $log.error('network error detected, resetting connection');
        if (error.name === 'NetworkError') {
          this.connect(Identity.currentUser).then(function () {
            Utility.each(Identity.contacts, function(contact) {
              this.listen(Identity.currentUser, contact);
            }.bind(this));
          }.bind(this));
        }
      }

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
      }).catch(function(error) {
        $log.error(error);
      });
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