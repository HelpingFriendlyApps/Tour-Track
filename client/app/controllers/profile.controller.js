'use strict';

angular.module('Tour-Track')
.controller('ProfileCtrl', ['$scope','Profile','$rootScope', 'allShows', function($scope, Profile, $rootScope, allShows) {

  Profile.userObject().then(function(user) {
    $scope.showsLoading = true;
    $scope.songsLoading = true;
    $rootScope.user = user.data;
    // console.log('$rootScope.user', $rootScope.user)

    Profile.userShows($scope.user.uid).then(function(shows) {
      $scope.showsLoading = false;
      $scope.userShows = shows;
      // console.log('$scope.userShows', $scope.userShows)
    });

    Profile.userSongs($scope.user.uid).then(function(songs) {
      $scope.songsLoading = false;
      $scope.userSongs = songs;
      // console.log('$scope.userSongs', $scope.userSongs)
    });
  });


  $scope.submitPhishAccountDeets = function(uid){
    var phishNetObj = { uid: uid, phish_username: this.phishNetUsername };
    $scope.showsLoading = true;
    $scope.songsLoading = true;
    Profile.addPhishAccountDetails(phishNetObj).then(function(data){
      $scope.showsLoading = false;
      $scope.userShows = data.data;
      // console.log('$scope.userShows', $scope.userShows)
      Profile.userSongs(phishNetObj.uid).then(function(songs) {
        $scope.songsLoading = false;
        $scope.userSongs = songs;
        // console.log('$scope.userSongs', $scope.userSongs)
      });
    });
    this.phishUsername = '';
    this.phishPassword = '';
  }




  $scope.allShows = allShows;
  // console.log('$scope.allShows', $scope.allShows)






}]);