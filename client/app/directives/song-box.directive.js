'use strict'

angular.module('Tour-Track').directive('songBox', ['TrackFactory', function(TrackFactory) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/song-box.html',
    scope: {
      song: '='
    },
    link: function(scope, element, attrs) {
      console.log('element', element)

      TrackFactory.getTracksBySongId(scope.song.id).then(tracks => {
        scope.timesPlayed = tracks.length;
      });

      TrackFactory.getSongDebut(scope.song.id).then(track => {
        scope.debut = track;
      });

      TrackFactory.getLastTimePlayed(scope.song.id).then(track => {
        scope.lastPlayed = track;
      });

    }
  };
}]);