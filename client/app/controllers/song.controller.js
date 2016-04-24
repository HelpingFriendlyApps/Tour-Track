'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', function($scope, song, TrackFactory, ShowFactory) {

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

      $scope.song.performances.forEach( (performance) => {
        var year = performance.date.slice(0,4);
        var index = years.indexOf(year);
        $scope.playsPerYear[index].count++;
        $scope.lengthsByYear[index].lengths.push({ showId: performance.show_id, length:  performance.duration });
      });

      $scope.lengthsByYear.forEach( (year) => {
        if(!year.lengths.length) return;
        year.avg = Math.floor(year.lengths.reduce( (a, b) => {
          if(year.lengths.length > 1) {
            if(!year.longestLength) {
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
          }
          return a + b.length;
        }, 0) / year.lengths.length);

      });
      console.log('$scope.playsPerYear', $scope.playsPerYear)
      console.log('$scope.lengthsByYear', $scope.lengthsByYear)


    });
  });

});