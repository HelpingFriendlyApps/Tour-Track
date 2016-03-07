'use strict';

angular.module('Tour-Track')
.controller('ShowCtrl', ['$scope', 'show', 'setlist', function($scope, show, setlist) {

  $scope.show = show;
  $scope.setlist = setlist;
  console.log('$scope.setlist', $scope.setlist)

}]);