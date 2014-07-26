'use strict';

angular.module('dtmsgApp')
  .service('Conversation', function Conversation(Constants, Storage, Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.homeScreen = {
      isActive: true
    };

    this.conversationIndex = [];

    this.conversations = [];

    this.addConversation = function(id) {
      if (this.getConversation(id)) {
        return;
      }

      var newConversation = {
        id: id,
        isOpen: false, isActive: false, unreadCount: 0, messages: [], currentMessage: '',
        sendingPromise: {}, lastOpened: null
      };

      this.conversations.push(newConversation);
      this.updateConversationIndex(newConversation);
      Storage.save(Constants.storageKeys.Conversation.conversation + id, newConversation);
    };

    this.getConversationInIndex = function(id) {
      return Utility.findById(this.conversationIndex, id);
    };

    this.updateConversationIndex = function(conversation) {
      var existingConversation = this.getConversationInIndex(conversation.id);

      if (existingConversation) {
        return;
      }
      this.conversationIndex.push({id: conversation.id});

      return Storage.save(Constants.storageKeys.Identity.conversationIndex, this.conversationIndex);
    };

    this.getConversation = function (id) {
      return Utility.findById(this.conversations, id);
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
