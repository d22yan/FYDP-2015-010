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
    userStatus: {
      online: 'online',
      offline: 'offline'
    },
    storageType: {
      local: 'localStorage',
      cloud: 'cloudStorage'
    }

  });
