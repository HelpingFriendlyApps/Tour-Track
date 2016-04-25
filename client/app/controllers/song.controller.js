'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', function($scope, song, TrackFactory, ShowFactory, $mdDialog, PlayerFactory) {

  $scope.song = song;
  TrackFactory.getTracksBySongId($scope.song.id).then( (tracks) => {
    $scope.song.performances = tracks;
    console.log('$scope.song', $scope.song)

    ShowFactory.getAllShowYears().then( (years) => {
      $scope.playsPerYear = [];
      $scope.durationsByYear = [];

      years.forEach( (year) => {
        $scope.playsPerYear.push({ year: year, count: 0 });
        $scope.durationsByYear.push({ year: year, durations: [] });
      });

      $scope.song.performances.forEach( (performance) => {
        var year = performance.date.slice(0,4);
        var index = years.indexOf(year);
        $scope.playsPerYear[index].count++;
        $scope.durationsByYear[index].durations.push({ showId: performance.show_id, time:  performance.duration });
      });

      $scope.durationsByYear.forEach( (year) => {
        if(!year.durations.length) return;
        year.avg = Math.floor(year.durations.reduce( (a, b) => {
          if(year.durations.length > 1) {
            year.longest = year.longest ? year.longest : { duration: b.time, showId: b.showId };
            if(year.longest.duration < b.time) year.longest = { duration: b.time, showId: b.showId };
            year.shortest = year.shortest ? year.shortest : { duration: b.time, showId: b.showId };
            if(year.shortest.duration > b.time) year.shortest = { duration: b.time, showId: b.showId };
          }
          return a + b.time;
        }, 0) / year.durations.length);

      });
      console.log('$scope.playsPerYear', $scope.playsPerYear)
      console.log('$scope.durationsByYear', $scope.durationsByYear)


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