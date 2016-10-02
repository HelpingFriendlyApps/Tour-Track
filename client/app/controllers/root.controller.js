'use strict';

angular.module('Tour-Track')

.controller('RootCtrl', ['$scope', '$rootScope', 'CredsFactory', 'ProfileFactory', function($scope, $rootScope, CredsFactory, ProfileFactory) {
    
  $scope.mapboxToken = '';

  CredsFactory.getMapBoxToken().then(token => {
    $scope.mapboxToken = token;
  });

  ProfileFactory.userObject().then(user => {
    $rootScope.user = user.data;
    console.log('$rootScope.user', $rootScope.user)
  });



}]);