'use strict';

angular.module('Tour-Track')
.controller('SongCtrl', ['$scope', 'song', function($scope, song) {

  $scope.song = song;

}]);