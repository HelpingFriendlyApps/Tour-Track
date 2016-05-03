'use strict';

angular.module('Tour-Track')
.controller('ProfileCtrl', ['$scope','Profile','$rootScope', 'allShows', function($scope, Profile, $rootScope, allShows) {

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


  $scope.submitPhishAccountDeets = function(uid){
    var phishNetObj = { uid: uid, phish_username: this.phishNetUsername };
    $scope.showsLoading = true;
    $scope.songsLoading = true;
    
    Profile.addPhishAccountDetails(phishNetObj).then(function(data){
      $scope.showsLoading = false;
      $scope.userShows = data.data;

      Profile.userSongs(phishNetObj.uid).then(function(songs) {
        $scope.songsLoading = false;
        $scope.userSongs = songs;
      });
    });
    
    this.phishUsername = '';
    this.phishPassword = '';
  }

  $scope.allShows = allShows;

}]);