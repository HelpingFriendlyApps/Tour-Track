'use strict';

app.controller('ShowCtrl', ["$scope", "show", "setlist", "ShowFactory", "PlayerFactory", "$mdDialog", function($scope, show, setlist, ShowFactory, PlayerFactory, $mdDialog) {

  $scope.show = show;
  $scope.show.setlist = setlist;
  console.log('$scope.show', $scope.show)

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


  $scope.openSongControls = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  $scope.hoverIn = function() { this.hover = true; }
  $scope.hoverOut = function() { this.hover = false; }

  $scope.play = function(song, index) {
    PlayerFactory.play(song, $scope.show.setlist.slice(++index, $scope.show.setlist.length));
  }

  $scope.upNext = PlayerFactory.upNext;
  $scope.addToUpNext = PlayerFactory.addToUpNext;

}]);












