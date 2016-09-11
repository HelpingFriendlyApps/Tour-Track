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
    },

    getSongDebut: function(songId) {
      return $http.get('/tracks/' + songId + '/debut').then(function(song) {
        return song.data;
      });
    },

    getLastTimePlayed: function(songId) {
      return $http.get('/tracks/' + songId + '/lastPlayed').then(song => {
        return song.data;
      });
    },

    getPrevTimePlayedFromDate: function(songId, date) {
      return $http.get('/tracks/' + songId + '/prevPlayed/' + date).then(function(song) {
        return song.data;
      });
    }

  }

}]);