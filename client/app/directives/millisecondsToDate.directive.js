'use strict';

app.filter('millisecondsToDate', function() {
  return function(ms) {
    return new Date(0,0,0).setMilliseconds(ms);
  }
});