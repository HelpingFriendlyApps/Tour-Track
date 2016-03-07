'use strict';

angular.module('Tour-Track')
.factory('SongFactory', function($http, $sce) {

  return {

    getAllSongs: function () {
      return $http.get('/songs').then(function(songs) {
        return songs.data;
      });
    },

    getSongById: function(songId) {
      return $http.get('/songs/' + songId).then(function(song) {
        return song.data;
      });
    }

  }

});