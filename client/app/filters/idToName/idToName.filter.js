'use strict';

angular.module('dtmsgApp')
  .filter('idToName', function (Identity, Constants) {
    return function (id, abbreviateUser) {

      return id === Identity.currentUser.id ?
        abbreviateUser ? Constants.abbreviatedName : Identity.currentUser.name :
        Identity.getContact(id).name;
    };
  });
