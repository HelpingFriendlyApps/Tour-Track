'use strict';

angular.module('Tour-Track')

.controller('RootController', ['$scope','CredsFactory','$rootScope', '$state', function($scope, CredsFactory, $rootScope, $state) {
    
    $scope.mapboxToken = "";
    $rootScope.$watch('player', (newVal, oldVal) => {
      if(!oldVal) $scope.player = $rootScope.player;
    });

    CredsFactory.getMapBoxToken().then( token => {
      $scope.mapboxToken = token;
    });

}]);