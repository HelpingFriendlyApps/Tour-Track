'use strict';

angular.module('Tour-Track')

.controller('RootCtrl', ['$scope', 'CredsFactory', function($scope, CredsFactory) {
    
    $scope.mapboxToken = "";

    CredsFactory.getMapBoxToken().then( token => {
      $scope.mapboxToken = token;
    });

}]);