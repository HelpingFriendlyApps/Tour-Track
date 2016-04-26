'use strict';

app.filter('secondsToDate', function() {
  return function(s) {
    return new Date(0,0,0).setSeconds(s);
  }
});