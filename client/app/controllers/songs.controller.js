'use strict';

angular.module('Tour-Track')
.controller('SongsCtrl', ['$scope', 'allSongs', function($scope, allSongs) {

  $scope.songs = allSongs.slice(0,36);
  console.log('$scope.songs', $scope.songs)

  $scope.loadMoreSongs = function() {
    for(let i = 0; i < 4; i++) {
      let nextSong = allSongs[$scope.songs.length];
      $scope.songs.push(nextSong);
    }
  }

}]);