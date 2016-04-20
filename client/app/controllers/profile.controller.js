'use strict';

angular.module('Tour-Track')
.controller('ProfileCtrl', ['$scope','Profile','$rootScope', function($scope, Profile, $rootScope) {

  Profile.userObject().then(function(user) {
    $scope.showsLoading = true;
    $scope.songsLoading = true;
    $rootScope.user = user.data;
    Profile.userShows($scope.user.uid).then(function(shows) {
        $scope.showsLoading = false;
      $scope.userShows = shows;
    });
    Profile.userSongs($scope.user.uid).then(function(songs) {
    $scope.songsLoading = false;
    $scope.userSongs = songs;
    });
  });

}]);