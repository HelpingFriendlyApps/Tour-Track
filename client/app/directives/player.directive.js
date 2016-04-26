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
      $sessionStorage.playlist = $sessionStorage.playlist || [];
      scope.playlist = $sessionStorage.playlist;
      scope.progress = 0;
      scope.volume = 100 * audio.volume;

      scope.$watch('playerSong', function(song) {
        if(!song) return;
        scope.start(song);
      });

      scope.$watch('addToPlaylist', function(song) {
        if(!song) return;
        $sessionStorage.playlist.push(song);
        $sessionStorage.playlist = scope.playlist;
      });

      scope.$watch('addToUpNext', function(song) {
        if(!song) return;
        $sessionStorage.playlist.unshift(song);
        $sessionStorage.playlist = scope.playlist;
      });

      scope.$watch('volume', function(volume) {
        if(!volume) return;
        audio.volume = volume / 100;
      });

      scope.start = function(song) {
        audio.pause();
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

      scope.next = function() {
        scope.start($sessionStorage.playlist.shift());
      }

      scope.prev = function() {
        audio.currentTime = 0;
      }

      scope.getProgress = function() {
        return 100 * scope.progress;
      }

      audio.addEventListener('timeupdate', function () {
        scope.progress = audio.currentTime / audio.duration;
        scope.currentTime = audio.currentTime;
        scope.duration = audio.duration;
        scope.$digest();
      });


      audio.addEventListener('ended', function () {
        scope.next()
      });

      $('.song-progress').click(function(e) {
        var seekTo = (e.pageX - $(this).offset().left) / $(this).width();
        audio.currentTime = seekTo * audio.duration;
      });

      scope.openSongControls = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      }

    }
  };
});