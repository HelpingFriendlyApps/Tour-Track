'use strict'

app.directive('player', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/directives/player.html',
    scope: {
      playerSong: '=',
      addToPlaylist: '=',
      addToUpNext: '='
    },
    link: function(scope, element, attrs) {

      var audio = document.createElement('audio');
      scope.isPlaying = false;
      scope.playlist = [];

      scope.$watch('playerSong', function(song) {
        if(!song) return;
        scope.start(song);
      });

      scope.$watch('addToPlaylist', function(song) {
        if(!song) return;
        scope.playlist.push(song);
      });

      scope.$watch('addToUpNext', function(song) {
        if(!song) return;
        scope.playlist.unshift(song);
      });

      scope.start = function(song) {
        audio.src = song.mp3;
        audio.load();
        audio.play();
        scope.isPlaying = true;
      }

      scope.pause = function() {
        audio.pause();
        scope.isPlaying = false;
      }

      scope.resume = function() {
        audio.play();
        scope.isPlaying = true;
      }

    }
  };
});