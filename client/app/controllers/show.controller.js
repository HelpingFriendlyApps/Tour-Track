'use strict';

app.controller('ShowCtrl', function($scope, show, setlist, ShowFactory) {

  $scope.show = show;
  $scope.show.setlist = setlist;
  console.log('$scope.show', $scope.show)

  var sets = [];
  $scope.show.setlist.forEach(function(song) {
    if(sets.indexOf(song.set) < 0) {
      song.firstOfSet = true;
      sets.push(song.set);
      console.log('sets', sets)
    }
  });

  $scope.setParser = function(set) {
    if(parseInt(set)) return 'Set ' + set;
    return 'Encore';
  }

  $scope.timeParser = function(ms) {
    var min = Math.floor(ms / 60000);
    var sec = Math.floor(ms / 1000 % 60);
    if(sec < 10) sec = '0' + sec;
    return min + ':' + sec;
  }

  ShowFactory.getNextShowByDate($scope.show.date).then(function(nextShow) {
    $scope.nextShow = nextShow;
  });

  ShowFactory.getPrevShowByDate($scope.show.date).then(function(prevShow) {
    $scope.prevShow = prevShow;
  });

  $scope.fullscreen = false;
  $scope.toggleFullscreen = function() {
    $scope.fullscreen = !$scope.fullscreen;
  }

});