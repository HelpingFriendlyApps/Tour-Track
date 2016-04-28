'use strict';

app.controller('ShowCtrl', function($scope, $rootScope, show, setlist, ShowFactory, $document, $timeout, PlayerFactory) {

  $scope.show = show;
  $scope.show.setlist = setlist;

  var sets = [];
  $scope.show.setlist.forEach( (song) => {
    if(sets.indexOf(song.set) < 0) {
      song.firstOfSet = true;
      sets.push(song.set);
    }
  });

  $scope.setParser = function(set) {
    if(parseInt(set)) return 'Set ' + set;
    return 'Encore';
  }

  ShowFactory.getNextShowByDate($scope.show.date).then( (nextShow) => {
    $scope.nextShow = nextShow;
  });

  ShowFactory.getPrevShowByDate($scope.show.date).then( (prevShow) => {
    $scope.prevShow = prevShow;
  });

  $rootScope.fullscreen = $rootScope.fullscreen ? $rootScope.fullscreen : false;
  $scope.showFullscreenInfo = $scope.alreadyFullscreen = $rootScope.fullscreen;

  $scope.toggleFullscreen = function() {
    $document.scrollTop(0, 800).then( () => {
      $rootScope.fullscreen = !$rootScope.fullscreen;
      if(!$rootScope.fullscreen) $scope.alreadyFullscreen = false;
    });
    if(!$scope.showFullscreenInfo) {
      $timeout(function() {
        $scope.showFullscreenInfo = true;
      }, 800);
    } else $scope.showFullscreenInfo = false;
  }

  $scope.hoverIn = function() { this.hover = true; }
  $scope.hoverOut = function() { this.hover = false; }

  $scope.play = function(song, index) {
    PlayerFactory.play(song, $scope.show.setlist.slice(++index, $scope.show.setlist.length));
  }

  $scope.upNext = PlayerFactory.upNext;
  $scope.addToUpNext = PlayerFactory.addToUpNext;

});












