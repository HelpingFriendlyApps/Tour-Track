'use strict';

app.controller('ShowCtrl', function($scope, $rootScope, show, setlist, ShowFactory, $document, $timeout) {

  $scope.show = show;
  $scope.show.setlist = setlist;
  console.log('$scope.show', $scope.show)

  var sets = [];
  $scope.show.setlist.forEach(function(song) {
    if(sets.indexOf(song.set) < 0) {
      song.firstOfSet = true;
      sets.push(song.set);
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

  $rootScope.fullscreen = $rootScope.fullscreen ? $rootScope.fullscreen : false;
  $scope.showFullscreenInfo = $scope.alreadyFullscreen = $rootScope.fullscreen;
  // $scope.alreadyFullscreen = $rootScope.fullscreen;

  $scope.toggleFullscreen = function() {
    $document.scrollTop(0, 800).then(function() {
      $rootScope.fullscreen = !$rootScope.fullscreen;
      if(!$rootScope.fullscreen) $scope.alreadyFullscreen = false;
    });

    if(!$scope.showFullscreenInfo) {
      $timeout(function() {
        $scope.showFullscreenInfo = true;
      }, 800);
    } else $scope.showFullscreenInfo = false;

  }

});












