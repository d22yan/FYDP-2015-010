'use strict';

angular.module('dtmsgApp')
  .service('Configuration', function Configuration(Constants, Storage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var defaults = {
      loginStatus: Constants.userStatus.online,
      storageType: Constants.storageType.local
    };

    this.defaults = defaults;

    var loginStatus = Storage.read(Constants.storageKeys.Configuration.loginStatus);
    this.loginStatus = loginStatus ? loginStatus : defaults.loginStatus;
    if (!loginStatus) { Storage.save(Constants.storageKeys.Configuration.loginStatus, defaults.loginStatus); }

    var storageType = Storage.read(Constants.storageKeys.Configuration.storageType);
    this.storageType = storageType ? storageType : defaults.storageType;
    if (!loginStatus) { Storage.save(Constants.storageKeys.Configuration.storageType, defaults.storageType); }
  });
