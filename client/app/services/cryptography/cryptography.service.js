'use strict';

angular.module('dtmsgApp')
  .service('Cryptography', function Cryptography() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.encrypt = function(plaintext) {
      var ciphertext = plaintext; //TODO: implement with SJCL

      return ciphertext;
    };
    this.decrypt = function (ciphertext) {
      var plaintext = ciphertext; //TODO: implement with SJCL

      return plaintext;
    };
  });
