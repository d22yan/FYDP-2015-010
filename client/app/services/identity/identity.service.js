'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($log, Storage, Communication, Constants, Conversation) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.currentUser = {};



    this.contacts = {
      '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8': {
        id: '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', name: 'Seed',
        status: Constants.userStatus.offline,
        conversation: Conversation.conversations['20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8']
      },
      '020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0': {
        id: '020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0', name: 'Asif',
        status: Constants.userStatus.offline,
        conversation: Conversation.conversations['020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0']
      },
      'b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285': {
        id: 'b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285', name: 'Lewis',
        status: Constants.userStatus.offline,
        conversation: Conversation.conversations['b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285']
      },
      '03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac': {
        id: '03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac', name: 'SangHoon',
        status: Constants.userStatus.offline,
        conversation: Conversation.conversations['03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac']
      },
      'bac8f97efae606179f747a69aad5d20dfa5ca5add3702e2f865f5501f5f32cd9': {
        id: 'bac8f97efae606179f747a69aad5d20dfa5ca5add3702e2f865f5501f5f32cd9', name: 'Danny',
        status: Constants.userStatus.offline,
        conversation: Conversation.conversations['bac8f97efae606179f747a69aad5d20dfa5ca5add3702e2f865f5501f5f32cd9']
      }
    };

    this.createUser = function(user) {
      return Communication.initialize().then(function (newUser) {
        this.updateUser({
          id: newUser.hashname,
          keypair: newUser.id,
          name: user.name,
          status: Constants.userStatus.online
        });
      }.bind(this)).catch(function (error) {
        $log.error('unable to create user');
        $log.error(error);
      });
    };

    this.updateUser = function(user) {
      if (user !== this.currentUser) {
        angular.copy(user, this.currentUser);
      }

      return Storage.save(Constants.storageKeys.Identity.currentUser, user);
    };

    this.deleteUser = function() {
      return this.updateUser({ name: Constants.defaultUserName });
    };
  });