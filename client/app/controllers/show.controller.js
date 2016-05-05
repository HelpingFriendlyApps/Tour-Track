'use strict';

app.controller('ShowCtrl', ["$scope", "$rootScope", "show", "setlist", "ShowFactory", "PlayerFactory", "SongFactory", "$mdDialog", "$q", function($scope, $rootScope, show, setlist, ShowFactory, PlayerFactory, SongFactory, $mdDialog, $q) {

  $scope.show = show;
  $scope.show.setlist = setlist;
  console.log('$scope.show', $scope.show)
  $rootScope.map = $rootScope.map || {};
  $rootScope.map.coordinates = [$scope.show.longitude, $scope.show.latitude];

  ShowFactory.getShowsByVenueId($scope.show.venue_id).then( (showsAtVenue) => {
    $scope.totalShowsAtVenue = showsAtVenue;
    $scope.totalShowsAtVenue.some( (show, i) => {
      if(show.id === $scope.show.id) $scope.xShowPlayedAtVenue = i + 1;
      return show.id === $scope.show.id;
    });
  });

  $q.all($scope.show.setlist.map( (song) => {
    var deffered = $q.defer();
    SongFactory.getPrevTimePlayed(song.song_id, song.date).then( (prevTimePlayed) => {
      deffered.resolve(prevTimePlayed);
    });
    return deffered.promise;
  })).then( (prevTimesPlayed) => {

    var biggestGap  = 0;
    $scope.show.setlist.forEach( (song, i) => {
      song.gap = song.show_number - prevTimesPlayed[i].show_number;
      if(song.gap > biggestGap) {
        biggestGap = song.gap;
        $scope.songWithBiggestGap = song;
      }
    });
  });

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

  $scope.getOrdinal = function(n) {
    if(parseFloat(n) === parseInt(n) && !isNaN(n)) {
      var s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    return n;     
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