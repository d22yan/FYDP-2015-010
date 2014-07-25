'use strict';

angular.module('dtmsgApp')
  .service('Cryptography', function Cryptography(SJCL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.passwordHash = null;
    this.passwordSalt = null;
    this.initializationVector = 'MROZx008/PKmMa7KGqoIag==';


    this.encrypt = function (plaintext) {
      var options = {
        iv: this.initializationVector,
        salt: this.passwordSalt
      };
      return angular.fromJson(SJCL.encrypt(this.passwordHash, plaintext, options)).ct;
    };

    this.decrypt = function (ciphertext) {
      var options = {
        iv: this.initializationVector,
        salt: this.passwordSalt
      };

      return SJCL.decrypt(this.passwordHash, angular.toJson({ct: ciphertext}), options);
    };

    this.hash = function (plaintext) {
      return SJCL.hash.sha256.hash(plaintext);
    };
  });
