'use strict';

describe('Service: Communication', function () {
  var store = {};

  // load the service's module
  beforeEach(module('rtmsgApp'));

  afterEach(function() {
    store = {};
  });

  // instantiate service
  var Communication;
  var Storage;
  var $rootScope;
  beforeEach(inject(function (_Communication_, _Storage_, _$rootScope_) {
    Communication = _Communication_;
    Storage = _Storage_;
    $rootScope = _$rootScope_;

    // Storage service mock
    spyOn(Storage, 'read').and.callFake(function(id) {
      return store[id];
    });

    spyOn(Storage, 'save').and.callFake(function(id, data) {
      store[id] = data;
      return true;
    });
  }));

  it('should return user session with expected parameters when initialized', function (done) {
    Communication.initialize().then(function (session) {
      expect(session.hashname).not.toBe(null);
    });

    $rootScope.$digest();
    done();
  });

  it('should store keypair in storage service when initialized', function (done) {
    Communication.initialize().then(function () {
      expect(store.keypair).not.toBe(null);
    });

    $rootScope.$digest();
    done();
  });
  //TODO: Fix promise based tests
  it('should use stored keypair to initialize session with expected hashname', function (done) {
    store.keypair =
      {'1a':'7P8gdfhqpIhylDuaTofulTxStk87MFIacK66vL1GRAJwahrAI7qX6w==','1a_secret':'+1xM7lzkNmeFmTd011EkFNxiVJc='};

    Communication.initialize().then(function (session) {
      expect(session.hashname).toMatch('59b4f38bd2b2cc1d5dcf84b05e3215a02794f01e485704d77e3d9dcfbabe7a76');
    });

    $rootScope.$digest();
    done();
  });
});
