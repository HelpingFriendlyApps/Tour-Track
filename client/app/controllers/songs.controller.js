'use strict';

angular.module('Tour-Track')
.controller('SongsCtrl', ['$scope', 'allSongs', function($scope, allSongs) {

  $scope.songs = allSongs;

}]);