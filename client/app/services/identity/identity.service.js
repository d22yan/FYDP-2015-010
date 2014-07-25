'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($rootScope, $window, $log, Storage, Constants, Conversation, Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.userIndex = [];

    this.currentUser = {};

    this.contacts = [];

    this.getContact = function(id) {
      return Utility.find(this.contacts, function(contact) {
        return contact.id === id;
      });
    };

    this.removeContact = function(id) {
      $log.info('removeContact');
      var index = this.contacts.indexOf(this.getContact(id));
      $log.info(index);
      this.contacts.splice(index, 1);
      $rootScope.$apply();
    };

    this.addContact = function(id) {
      if (this.getContact(id)) {
        return Utility.find(this.contacts, function(contact) {
          return contact.id === id;
        });
      }
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

      this.updateIndex(user);
      return Storage.save(Constants.storageKeys.Identity.userPrefix + user.id, user);
    };

    this.updateIndex = function (user) {
      var existingUser = this.getUserInIndex(user.id);

      if (existingUser) {
        existingUser.name = user.name;
      } else {
        this.userIndex.push({id: user.id, name: user.name});
      }

      return Storage.savePlainText(Constants.storageKeys.Identity.userIndex, this.userIndex);
    };

    this.getUserInIndex = function (id) {
      return Utility.find(this.userIndex, function(user) {
        return user.id === id;
      });
    };

    this.deleteUser = function () {
      var currentIndex = this.userIndex.indexOf(this.getUserInIndex(this.currentUser.id));
      this.userIndex.splice(currentIndex, 1);

      Storage.savePlainText(Constants.storageKeys.Identity.userIndex, this.userIndex);

      Storage.remove(Constants.storageKeys.Identity.userPrefix + this.currentUser.id);

      return $window.location.reload();
    };
  });