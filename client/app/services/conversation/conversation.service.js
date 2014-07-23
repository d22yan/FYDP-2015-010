'use strict';

angular.module('dtmsgApp')
  .service('Conversation', function Conversation(Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.conversations = [];

    this.getConversation = function(id) {
      return Utility.find(this.conversations, function(conversation) {
        return conversation.id === id;
      });
    };

  });
