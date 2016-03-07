'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', ['$scope', 'song', function($scope, song) {

  $scope.song = song;
  console.log('$scope.song', $scope.song)

}]);