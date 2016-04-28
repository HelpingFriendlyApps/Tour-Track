'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', function($scope, song, TrackFactory, ShowFactory, $mdDialog, PlayerFactory) {

  $scope.song = song;
  TrackFactory.getTracksBySongId($scope.song.id).then( (tracks) => {
    $scope.song.performances = tracks;

    ShowFactory.getAllShowYears().then( (years) => {
      $scope.playsPerYear = [];
      $scope.lengthsByYear = [];

      years.forEach( (year) => {
        $scope.playsPerYear.push({ year: year, count: 0 });
        $scope.lengthsByYear.push({ year: year, lengths: [] });
      });

      $scope.song.performances.forEach( (performance) => {
        var year = performance.date.slice(0,4);
        var index = years.indexOf(year);
        $scope.playsPerYear[index].count++;
        $scope.lengthsByYear[index].lengths.push({ showId: performance.show_id, length:  performance.duration });
      });

      $scope.lengthsByYear.forEach( (year) => {
        if(!year.lengths.length) return;
        year.avg = Math.floor(year.lengths.reduce( (a, b, i) => {
          if(!i) {
            year.longestLength = year.shortestLength = b.length;
            year.longestShowId = year.shortestShowId = b.showId;
          }
          if(year.longestLength < b.length) {
            year.longestLength = b.length;
            year.longestShowId = b.showId;
          }
          if(year.shortestLength > b.length) {
            year.shortestLength = b.length;
            year.shortestShowId = b.showId;
          }
          return a + b.length;
        }, 0) / year.lengths.length);

      });

      $scope.openSongControls = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      }

      $scope.hoverIn = function() {
        this.hover = true;
      }

      $scope.hoverOut = function() {
        this.hover = false;
      }

      $scope.playSong = PlayerFactory.playSong;
      $scope.addToPlaylist = PlayerFactory.addToPlaylist;
      $scope.addToUpNext = PlayerFactory.addToUpNext;



    });
  });

});