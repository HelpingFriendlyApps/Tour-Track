'use strict';

app.controller('ShowCtrl', function($scope, show, setlist) {

  $scope.show = show;
  $scope.show.setlist = setlist;
  console.log('$scope.show', $scope.show)

  $scope.timeParser = function(ms) {
    var min = Math.floor(ms / 60000);
    var sec = Math.floor(ms / 1000 % 60);
    if(sec < 10) sec = '0' + sec;
    return min + ':' + sec;
  }

});