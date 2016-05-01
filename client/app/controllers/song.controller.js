'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', ["$scope", "song", "TrackFactory", "ShowFactory", "$mdDialog", "PlayerFactory", function ($scope, song, TrackFactory, ShowFactory, $mdDialog, PlayerFactory) {

  $scope.song = song;
  TrackFactory.getTracksBySongId($scope.song.id).then( (tracks) => {
    $scope.song.performances = tracks;
    console.log('$scope.song', $scope.song)

    ShowFactory.getAllShowYears().then( (years) => {
      $scope.playsPerYear = [];
      $scope.lengthsByYear = [];

      years.forEach( (year) => {
        $scope.playsPerYear.push({ year: year, count: 0 });
        $scope.lengthsByYear.push({ year: year, lengths: [] });
      });

      $scope.biggestGap = {gap: 0, from: null, to: null};
      var prevPerformance;


      $scope.song.performances.forEach( (performance) => {
        var year = performance.date.slice(0,4);
        var yearIdx = years.indexOf(year);

        prevPerformance = prevPerformance || performance;
        $scope.biggestGap.from = $scope.biggestGap.from || performance;

        var gap = performance.show_number - prevPerformance.show_number;
        if(gap > $scope.biggestGap.gap) {
          $scope.biggestGap.gap = gap;
          $scope.biggestGap.from = prevPerformance;
          $scope.biggestGap.to = performance;
        }

        prevPerformance = performance;

        $scope.playsPerYear[yearIdx].count++;
        $scope.lengthsByYear[yearIdx].lengths.push({ showId: performance.show_id, length:  performance.duration });
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

    });
  });

  ShowFactory.getLastShow().then( (lastShow) => {
    $scope.lastShow = lastShow;
  });

  $scope.openSongControls = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  $scope.hoverIn = function() { this.hover = true; }
  $scope.hoverOut = function() { this.hover = false; }

  $scope.play = PlayerFactory.play;
  $scope.upNext = PlayerFactory.upNext;
  $scope.addToUpNext = PlayerFactory.addToUpNext;


}]);
