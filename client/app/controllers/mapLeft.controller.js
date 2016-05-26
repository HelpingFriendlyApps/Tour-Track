'use strict';

angular.module('Tour-Track')
.controller('MapLeftCtrl', ['$scope', function($scope) {

  $scope.shows = {};

  $scope.doIt = function() {
    console.log('$scope.shows', $scope.shows)
  }

}]);