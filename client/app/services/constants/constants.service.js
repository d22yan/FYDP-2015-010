'use strict';

angular.module('dtmsgApp')
  .constant('Constants', {
    storageKeys: {
      prefix: 'dtmsg',
      Configuration: {
        currentConfiguration: 'Configuration.currentConfiguration'
      },
      Identity: {
        userPrefix: 'Identity.user.',
        userIndex: 'Identity.userIndex'
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
