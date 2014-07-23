'use strict';

angular.module('dtmsgApp')
  .constant('Constants', {
    storageKeys: {
      prefix: 'dtmsg',
      Configuration: {
        loginStatus: 'Configuration.loginStatus',
        storageType: 'Configuration.storageType'
      },
      Identity: {
        currentUser: 'user' //TODO: change key to follow naming convention, breaking existing hard-coded hashnames
      }
    },
    channelName: {
      prefix: 'dtmsg-',
      invite: 'invite'
    },
    errorTypes: {
      timeout: 'timeout'
    },
    defaultUserName: 'New User',
    abbreviatedName: 'You',
    userStatus: {
      online: 'online',
      busy: 'busy',
      away: 'away',
      offline: 'offline',
      invite: 'invite',
      invited: 'invited'
    },
    storageType: {
      local: 'localStorage',
      cloud: 'cloudStorage'
    }

  });
