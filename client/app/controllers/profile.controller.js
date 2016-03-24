'use strict';

angular.module('Tour-Track')
.controller('ProfileCtrl', ['$scope','Profile','$rootScope', function($scope, Profile, $rootScope) {

  Profile.userObject().then(function(user) {
    $rootScope.user = user.data;
    console.log('$scope.user', $scope.user)
    Profile.userShows($scope.user.uid).then(function(shows) {
      $scope.userShows = shows;
      console.log('$scope.userShows', $scope.userShows)
      console.log('$scope.userShows.length', $scope.userShows.length)
    });
    Profile.userSongs($scope.user.uid).then(function(songs) {
      $scope.userSongs = songs;
      console.log('$scope.userSongs', $scope.userSongs)
    });
  });

}]);