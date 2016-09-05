'use strict';

angular.module('Tour-Track')
.controller('ShowCtrl', ['$scope', 'show', 'setlist', function($scope, show, setlist) {

  $scope.show = show;
  console.log('$scope.show', $scope.show)
  $scope.setlist = setlist;
  console.log('$scope.setlist', $scope.setlist)

}]);