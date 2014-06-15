'use strict';

/**
 * @ngdoc service
 * @name rtmsgApp.Communication
 * @description
 * # Communication
 * Service in the rtmsgApp. Built into communication.js with telehash library using grunt-browserify task
 */
angular.module('rtmsgApp')
  .service('Communication', function Communication() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var telehash = require('telehash');

    // TODO: Should abstract telehash implementation details
    this.initialize = telehash.init;
  });