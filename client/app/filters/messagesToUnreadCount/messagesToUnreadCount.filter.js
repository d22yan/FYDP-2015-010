'use strict';

angular.module('dtmsgApp')
  .filter('messagesToUnreadCount', function (Utility) {
    return function (messages) {
      var unreadCount = Utility.reduce(messages, function (memo, message) {
        return !message.read ? memo + 1 : memo;
      }, 0);

      return unreadCount !== 0 ? unreadCount : null;
    };
  });
