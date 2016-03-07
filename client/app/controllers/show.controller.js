'use strict';

angular.module('Tour-Track')
.controller('ShowCtrl', ['$scope', 'show', function($scope, show) {

  $scope.show = show;
  console.log('$scope.show', $scope.show)

}]);