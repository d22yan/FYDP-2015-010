'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($rootScope, $log, Storage, Constants, Conversation, Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.currentUser = {};

//    $rootScope.$watch(function(){
//      return Communication.receivedInvitePromises;
//    }, function(newPromises) {
//      if (newPromises.length === 0) {
//        return;
//      }
//
//      newPromises.pop().then(function (packet) {
//        var id = packet.from.hashname;
//
//        Conversation.conversations.push({
//          id: id,
//          isOpen: false, isActive: false, unreadCount: 0, messages: [], currentMessage: '',
//          sendingPromise: {}, lastOpened: null
//        });
//
//        this.contacts.push({
//          id: id, name: packet.js.i,
//          status: Constants.userStatus.invite, lastUpdate: null,
//          conversation: Conversation.getConversation(id)
//        });
//      }.bind(this)).catch($log.error);
//    });

    this.contacts = [
      {
        id: '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8', name: 'Seed',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation('20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8')
      },
      {
        id: '020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0', name: 'Asif',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation('020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0')
      },
      {
        id: '03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac', name: 'SangHoon',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation('03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac')
      },
      {
        id: '1036186c5b22b24886b894715ebf4558e93742186be4713f7b36e7eeba5ad4d3', name: 'Danny',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation('1036186c5b22b24886b894715ebf4558e93742186be4713f7b36e7eeba5ad4d3')
      },
      {
        id: 'da40d455523704cdce91dccb565332310c9b46b5e6b7fe703af71b0229d429af', name: 'Asif Laptop',
        status: Constants.userStatus.offline, lastUpdate: null,
        conversation: Conversation.getConversation('da40d455523704cdce91dccb565332310c9b46b5e6b7fe703af71b0229d429af')
      }
    ];

    this.getContact = this.getConversation = function(id) {
      return Utility.find(this.contacts, function(contact) {
        return contact.id === id;
      });
    };

    this.createUser = function(newUser) {
      this.updateUser({
        id: newUser.hashname,
        keypair: newUser.id,
        name: this.currentUser.name,
        status: Constants.userStatus.online
      });
    }.bind(this);

    this.updateUser = function(user) {
      if (user !== this.currentUser) {
        angular.copy(user, this.currentUser);
      }
      $log.info(user);
      return Storage.save(Constants.storageKeys.Identity.currentUser, user);
    };

    this.deleteUser = function() {
      return this.updateUser({ name: Constants.defaultUserName });
    };
  });