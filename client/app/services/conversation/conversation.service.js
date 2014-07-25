'use strict';

angular.module('dtmsgApp')
  .service('Conversation', function Conversation(Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.homeScreen = {
      isActive: true
    };

    this.conversations = [];

    this.getConversation = function (id) {
      return Utility.find(this.conversations, function(conversation) {
        return conversation.id === id;
      });
    };

    this.getOpenConversations = function () {
      return Utility.filter(this.conversations, function(conversation) {
        return conversation.isOpen;
      });
    };

    this.deactivateAll = function () {
      this.homeScreen.isActive = false;
      Utility.each(this.conversations, function(conversation) {
        conversation.isActive = false;
      });
    };
  });
