'use strict';

angular.module('dtmsgApp')
  .service('Initialization', function Initialization(
    $log, $interval, Identity, Communication, Storage, Configuration, Conversation, Cryptography, Utility, Constants) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    Identity.userIndex = Storage.readPlainText(Constants.storageKeys.Identity.userIndex);
    if (!Identity.userIndex) {
      Identity.userIndex = [];
    }

    this.initializationPromise = {};

    this.initializeNewUser = function (password) {
      Cryptography.passwordHash = angular.toJson(Cryptography.hash(password));

      angular.copy(Communication.initialize().then(function (newUser) {
        Cryptography.passwordSalt = newUser.hashname;

        Storage.storagePrefix = newUser.hashname;

        return newUser;
      }).then(Identity.createUser)
        .then(this.initialize)
        .catch($log.error), this.initializationPromise);

      return this.initializationPromise;
    };

    this.initializeExistingUser = function (password) {
      Cryptography.passwordHash = Cryptography.hash(password);

      Communication.connect(Identity.currentUser);
    };

    this.initialize = function () {
      if (Identity.currentUser.keypair) {

        Identity.contactIndex = Storage.read(Constants.storageKeys.Identity.contactIndex);
        Conversation.conversationIndex = Storage.read(Constants.storageKeys.Conversation.conversationIndex);

        if (!Identity.contactIndex) {
          Identity.contactIndex = [];
        }

        if (!Conversation.conversationIndex) {
          Conversation.conversationIndex = [];
        }

        Utility.each(Conversation.conversationIndex, function(conversation) {
          var existingConversation = Storage.read(Constants.storageKeys.Conversation.conversation + conversation.id);
          existingConversation.messages = [];
          existingConversation.sendingPromise = {};
          Conversation.conversations.push(existingConversation);
        });

        Utility.each(Identity.contactIndex, function(contact) {
          var existingContact = Storage.read(Constants.storageKeys.Identity.contact + contact.id);
          existingContact.conversation = Conversation.getConversation(contact.id);
          Identity.contacts.push(existingContact);
        });

        return Communication.connect(Identity.currentUser).then(function() {
          Utility.each(Identity.contacts, function(contact, index, contacts) {
            if (contact.id === Identity.currentUser.id) {
              return;
            }

            (function(contact) {
              Communication.initializeContact(contact);
            })(contact);
          });
        }).catch($log.error);
      }
    };
  });
