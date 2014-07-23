'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($rootScope, $log, Storage, Constants, Conversation, Utility) {
    // AngularJS will instantiate a singleton by calling "new" on this function
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