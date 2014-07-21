'use strict';

angular.module('dtmsgApp')
  .filter('idToName', function (Identity) {
    return function (id) {
      return id === Identity.currentUser.id ? Identity.currentUser.name : Identity.contacts[id].name;
    };
  });
