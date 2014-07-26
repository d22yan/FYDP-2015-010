'use strict';

angular.module('dtmsgApp')
  .service('Utility', function Utility(Underscore) {
    // Service logic
    // ...

    this.findById = function(list, id) {
    	return Underscore.find(list, function(item) {
    		return item.id === id;
    	});
    };

    this.each = Underscore.each;

    this.filter = Underscore.filter;

  });
