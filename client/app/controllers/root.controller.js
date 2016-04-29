'use strict';

angular.module('Tour-Track')

.controller('RootController', ['$scope','CredsFactory', function($scope, CredsFactory) {
    $scope.mapboxToken = "";
    CredsFactory.getMapBoxToken().then(function(token){
        $scope.mapboxToken = token;
        console.log($scope, 'Loaded creds');
    });

}]);