'use strict';

angular.module('dtmsgApp')
  .service('Conversation', function Conversation() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var open = function() { this.isOpen = true; this.isActive = true; };
    var close = function() { this.isOpen = false; this.isActive = false; };

    this.conversations = {
      '20caf602a4f4b9dcb3133062af672d9ac877244c16439cbce93c40629bcfd5e8': {
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: []
      },
      '020e574ea352bf6a78063d0996840f747fd6a738346481385c6a372ae11712b0': {
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: []
      },
      'b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285': {
        isOpen: false, isActive: false, hasUnread: false, open: open, close: close, messages: []
      }
    };
  });
