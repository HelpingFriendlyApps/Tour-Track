'use strict';

angular.module('Tour-Track')
.factory('SongFactory', ["$http", "$sce", function($http, $sce) {

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
    },

    getPrevSongByName: function(songName) {
      return $http.get('/songs/prev/' + songName).then(function(song) {
        return song.data;
      });
    },

    getNextSongByName: function(songName) {
      return $http.get('/songs/next/' + songName).then(function(song) {
        return song.data;
      });
    }

  }

}]);