'use strict';

angular.module('dtmsgApp')
  .service('Configuration', function Configuration($window, Constants, Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.defaults = {
      loginStatus: Constants.userStatus.online,
      storageType: Constants.storageType.local
    };

    this.currentConfiguration = {
      loginStatus: this.defaults.loginStatus,
      storageType: this.defaults.storageType,
      dragEnabled: $window.innerWidth <= 768
    };
  });
