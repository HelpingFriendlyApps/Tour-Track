'use strict'

app.directive('player', function($mdDialog, $sessionStorage) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: '../views/directives/player.html',
    scope: {
      song: '=',
      showSongsList: '=',
      upNext: '=',
      addToUpNext: '='
    },
    link: function(scope, element, attrs) {

      var audio = document.createElement('audio');
      scope.isPlaying = false;
      scope.upNextList = $sessionStorage.upNextList || [];
      scope.showSongsList = $sessionStorage.showSongsList || [];
      scope.playlist = scope.upNextList.concat(scope.showSongsList);
      scope.progress = 0;
      scope.volume = 100 * audio.volume;

      scope.$watch('song', function(song) {
        if(!song) return;
        scope.start(song);
      });

      scope.$watch('showSongsList', function(showSongsList) {
        if(!showSongsList) return;
        scope.showSongsList = showSongsList;
        updatePlaylist();
      });

      scope.$watch('upNext', function(song) {
        if(!song) return;
        scope.upNextList.push(song);
        updatePlaylist();
      });

      scope.$watch('addToUpNext', function(song) {
        if(!song) return;
        scope.upNextList.unshift(song);
        updatePlaylist();
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
        if(!scope.playlist.length) return;
        if($sessionStorage.upNextList.length) scope.start($sessionStorage.upNextList.length.shift());
        else scope.start($sessionStorage.showSongsList.length.shift());
        updatePlaylist();
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

      $('.progress-bar').click(function(e) {
        var seekTo = (e.pageX - $(this).offset().left) / $(this).width();
        audio.currentTime = seekTo * audio.duration;
      });

      scope.openSongControls = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      }

      function updatePlaylist() {
        $sessionStorage.upNextList = scope.upNextList;
        $sessionStorage.showSongsList = scope.showSongsList;
        scope.playlist = scope.upNextList.concat(scope.showSongsList);
      }

    }
  };
});