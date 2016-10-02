'use strict';

angular.module('Tour-Track')

.controller('ProfileCtrl', ['$scope', '$rootScope', 'ProfileFactory', function($scope, $rootScope, ProfileFactory) {

  ProfileFactory.userShows($rootScope.user.uid).then(shows => {
    $scope.userShows = shows;
    console.log('$scope.userShows', $scope.userShows)
  });

  ProfileFactory.userSongs($rootScope.user.uid).then(songs => {
    $scope.userSongs = songs;
    console.log('$scope.userSongs', $scope.userSongs)
  });


  $scope.submitPhishNetDetails = function(uid) {
    console.log('uid', uid)
    let phishNetObj = {
      uid: uid,
      phish_username: this.phishNetUsername
    };

    ProfileFactory.addPhishAccountDetails(phishNetObj).then(userShows => {
      $scope.userShows = userShows.data;
      console.log('$scope.userShows', $scope.userShows)
    });
  }

}]);