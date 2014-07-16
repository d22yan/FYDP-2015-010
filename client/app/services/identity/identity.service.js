'use strict';

angular.module('dtmsgApp')
  .service('Identity', function Identity($log, Storage, Communication) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.currentUser = Storage.read('user');

    if (!this.currentUser) {
      this.currentUser = { name: 'New User' };
    }

    if (this.currentUser.keypair) {
      Communication.connect(this.currentUser);
    }

    var open = function() { this.isOpen = true; this.isActive = true; };
    var close = function() { this.isOpen = false; this.isActive = false; };

    this.contacts = [
      {id:'b808c525f57d2a8b4dd4b75f4f27181095dc2f9f567165b3e7a7dd34a6881285', name: 'contact1', isOpen: true, isActive: true, hasUnread: true, openChat: open, closeChat: close, message: ''},
      {id:'904bq87gbq348fbqa3097849432', name: 'contact2', isOpen: false, isActive: false, hasUnread: false, openChat: open, closeChat: close, message: '',
        messages: [{content: '1', author: 'contact2'},{content: '2', author: 'contact2'},{content: '3', author: 'contact2'},{content: '4', author: 'contact2'}]},
      {id:'978432qgb8q37gb4587g43qb987', name: 'contact3', isOpen: true, isActive: false, hasUnread: false, openChat: open, closeChat: close, message: ''}
    ];

    this.createUser = function(user) {
      return Communication.initialize().then(function (newUser) {
        this.updateUser({
          id: newUser.hashname,
          keypair: newUser.id,
          name: user.name
        });

        Communication.connect(newUser);
      }.bind(this)).then(null, function (error) {
        $log.error('unable to create user');
        $log.error(error);
      });
    };

    this.updateUser = function(user) {
      angular.copy(user, this.currentUser);

      return Storage.save('user', user);
    }.bind(this);

    this.deleteUser = function() {
      return this.updateUser({ name: 'New User' });
    }.bind(this);
  });