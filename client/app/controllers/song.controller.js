'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', function($scope, song, TrackFactory) {

  $scope.song = song;
  TrackFactory.getTracksBySongId($scope.song.id).then(function(tracks) {
    $scope.song.performances = tracks;
    console.log('$scope.song', $scope.song)
  });


});