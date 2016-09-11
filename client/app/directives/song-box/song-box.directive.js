'use strict'

angular.module('Tour-Track').directive('songBox', ['TrackFactory', function(TrackFactory) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/directives/song-box/song-box.html',
    scope: {
      song: '='
    },
    link: function(scope, element, attrs) {

      TrackFactory.getTracksBySongId(scope.song.id).then(tracks => {
        scope.timesPlayed = tracks.length;
      });

      TrackFactory.getSongDebut(scope.song.id).then(debut => {
        scope.debut = debut;
      })

    }
  };
}]);