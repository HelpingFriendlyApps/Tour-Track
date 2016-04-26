'use strict'

app.directive('player', function($mdDialog, $sessionStorage) {
  return {
    replace: true,
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
      // scope.playlist = [];
      $sessionStorage.playlist = $sessionStorage.playlist || [];
      scope.playlist = $sessionStorage.playlist;
      console.log('scope.playlist', scope.playlist)

      scope.$watch('playerSong', function(song) {
        if(!song) return;
        console.log('SONG IN PLAYER', song)
        scope.start(song);
      });

      scope.$watch('addToPlaylist', function(song) {
        if(!song) return;
        $sessionStorage.playlist.push(song);
        $sessionStorage.playlist = scope.playlist;
        console.log('PLAYLIST SONG IN PLAYER', song)
      });

      scope.$watch('addToUpNext', function(song) {
        if(!song) return;
        $sessionStorage.playlist.unshift(song);
        $sessionStorage.playlist = scope.playlist;
        console.log('PLAYLIST SONG IN PLAYER', song)
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



      scope.openSongControls = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      }

    }
  };
});