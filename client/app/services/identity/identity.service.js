'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($rootScope, $window, $log, Storage, Constants, Cryptography, Conversation, Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.userIndex = [];

    this.contactIndex = [];

    this.currentUser = {};

    this.contacts = [];
    
    this.addContact = function(id) {
      if (this.getContact(id)) {
        return;
      }

      Conversation.addConversation(id);

      var newContact = {
        id: id, name: 'Invited',
        status: Constants.userStatus.invited, lastUpdate: null,
        conversation: Conversation.getConversation(id)
      };

      this.contacts.push(newContact);
      this.updateContactIndex(newContact);

      Storage.save(Constants.storageKeys.Identity.contact + id, this.copyContactForStorage(newContact));

      return newContact;
    };

    this.updateContact = function(contact) {
      var existingContact = this.getContact(contact.id);
      if (contact !== existingContact) {
        existingContact.id = contact.id;
        existingContact.name = contact.name;
        existingContact.status = contact.status;
        existingContact.lastUpdate = contact.lastUpdate;
      }
      Storage.save(Constants.storageKeys.Identity.contact + existingContact.id, this.copyContactForStorage(existingContact));
    };

    this.copyContactForStorage = function(contact) {
      return {
        id: contact.id, name: contact.name,
        status: contact.status, lastUpdate: contact.lastUpdate,
      };      
    };

    this.getContact = function(id) {
      return Utility.findById(this.contacts, id);
    };

    this.removeContact = function(id) {
      $log.info('removeContact');
      var index = this.contacts.indexOf(this.getContact(id));
      $log.info(index);
      this.contacts.splice(index, 1);
      $rootScope.$apply();
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

      this.updateUserIndex(user);
      return Storage.save(Constants.storageKeys.Identity.user, user);
    };

    this.authenticateUser = function (user, password) {
      Cryptography.passwordHash = angular.toJson(Cryptography.hash(password));
      Cryptography.passwordSalt = user.id;

      Storage.storagePrefix = user.id;

      var authenticationResult = Storage.read(Constants.storageKeys.Identity.user);
      if (!authenticationResult) {
        Cryptography.passwordHash = null;
        Cryptography.passwordSalt = null;
        Storage.storagePrefix = '';
        return false;
      }

      angular.copy(authenticationResult, this.currentUser);

      return true;
    };

    this.updateUserIndex = function (user) {
      var existingUser = this.getUserInIndex(user.id);

      if (existingUser) {
        existingUser.name = user.name;
      } else {
        this.userIndex.push({id: user.id, name: user.name});
      }

      return Storage.savePlainText(Constants.storageKeys.Identity.userIndex, this.userIndex);
    };

    this.updateContactIndex = function(contact) {
      var existingContact = this.getContactInIndex(contact.id);

      if (existingContact) {
        return;
      }
      this.contactIndex.push({id: contact.id});

      return Storage.save(Constants.storageKeys.Identity.contactIndex, this.contactIndex);
    };

    this.getContactInIndex = function(id) {
      return Utility.findById(this.contactIndex, id);
    };

    this.getUserInIndex = function (id) {
      return Utility.findById(this.userIndex, id);
    };

    this.deleteUser = function () {
      var currentIndex = this.userIndex.indexOf(this.getUserInIndex(this.currentUser.id));
      this.userIndex.splice(currentIndex, 1);

      Storage.savePlainText(Constants.storageKeys.Identity.userIndex, this.userIndex);

      Storage.remove(Constants.storageKeys.Identity.user + this.currentUser.id);

      return $window.location.reload();
    };
  });