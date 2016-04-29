'use strict';

angular.module('Tour-Track')
.factory('TrackFactory', ["$http", "$sce", function($http, $sce) {

  return {

    getAllTracks: function() {
      return $http.get('/tracks').then(function(tracks) {
        return tracks.data;
      });
    },

    getTracksBySongId: function(songId) {
      return $http.get('/tracks/' + songId).then(function(tracks) {
        return tracks.data;
      });
    }
  }

}]);