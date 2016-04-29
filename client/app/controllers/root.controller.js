'use strict';

angular.module('Tour-Track')

.controller('RootController', ['$scope','CredsFactory','$rootScope', function($scope, CredsFactory, $rootScope) {
    $scope.mapboxToken = "";
    $rootScope.$watch('player', (newVal, oldVal) => {
        if(!oldVal){
            $scope.player = $rootScope.player;
        }
    })

    CredsFactory.getMapBoxToken().then( token => {
        $scope.mapboxToken = token;
    });

    $rootScope.toggleFullscreen = function() {
      $rootScope.fullscreen = !$rootScope.fullscreen;
      $rootScope.fullscreen ? $('.main').removeClass('animated bounceInRight').addClass('animated bounceOutRight') : $('.main').removeClass('animated bounceOutRight').addClass('animated bounceInRight');
    }

}]);