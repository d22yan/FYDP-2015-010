'use strict';

angular.module('dtmsgApp')
  .service('Conversation', function Conversation(Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.conversations = [
      {
        id: '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      },
      {
        id: '020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      },
      {
        id: 'b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      },
      {
        id: '03350c42e8d78e83919afa8fa20259fe6f50fb218a02c08cf7bf583360eaa8ac',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      },
      {
        id: 'bac8f97efae606179f747a69aad5d20dfa5ca5add3702e2f865f5501f5f32cd9',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      },
      {
        id: 'da40d455523704cdce91dccb565332310c9b46b5e6b7fe703af71b0229d429af',
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: [], currentMessage: '',
        sendingPromise: {}, channel: null, lastOpened: null
      }
    ];

    this.getConversation = function(id) {
      return Utility.find(this.conversations, function(conversation) {
        return conversation.id === id;
      });
    };

  });
