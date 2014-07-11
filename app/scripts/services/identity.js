'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Identity
 * @description
 * # Identity
 * Service in the rtmsgApp.
 */
angular.module('rtmsgApp')
  .service('Identity', function Identity($rootScope, Storage, Communication, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.currentUser = Storage.read('user');

    var open = function() { this.isOpen = true; this.isActive = true; };
    var close = function() { this.isOpen = false; this.isActive = false; };

    this.contacts = [
      {id:'s9hqn489g7hb43q89r7bg8gq34t', name: 'contact1', isOpen: true, isActive: true, hasUnread: true, openChat: open, closeChat: close},
      {id:'904bq87gbq348fbqa3097849432', name: 'contact2', isOpen: false, isActive: false, hasUnread: false, openChat: open, closeChat: close,
        messages: [{content: "1", author: "contact2"},{content: "2", author: "contact2"},{content: "3", author: "contact2"},{content: "4", author: "contact2"}]},
      {id:'978432qgb8q37gb4587g43qb987', name: 'contact3', isOpen: true, isActive: false, hasUnread: false, openChat: open, closeChat: close}
    ];

    this.createUser = function(user) {
      return Communication.initialize().then(function (newUser) {
        this.updateUser({
          id: newUser.hashname,
          keypair: newUser.id,
          name: user.name
        });
      }.bind(this));
    };

    this.updateUser = function(user) {
      this.currentUser = user;
      return Storage.save('user', user);
    };

    this.deleteUser = function() {
      return this.updateUser({name: "New User"});
    };
  });
