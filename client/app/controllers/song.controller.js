'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', function($scope, song, TrackFactory, ShowFactory) {

  $scope.song = song;
  TrackFactory.getTracksBySongId($scope.song.id).then( (tracks) => {
    $scope.song.performances = tracks;
    console.log('$scope.song', $scope.song)

    ShowFactory.getAllShowYears().then( (years) => {
      $scope.playsPerYear = [];

      years.forEach( (year) => {
        $scope.playsPerYear.push({ year: year, count: 0 });
      });

      $scope.song.performances.forEach( (performance) => {
          var year = performance.date.slice(0,4);
          $scope.playsPerYear[years.indexOf(year)].count++;
      });

    });
  });

});