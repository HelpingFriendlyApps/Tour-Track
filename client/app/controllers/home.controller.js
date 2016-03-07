'use strict';

angular.module('Tour-Track')
.controller('HomeCtrl', ['$scope', 'Profile', function($scope, Profile) {

  Profile.userObject().then(function(data) {
    var user = data.data;
    console.log('user', user)
  });

}]);