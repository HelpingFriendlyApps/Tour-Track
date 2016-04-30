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

    // $rootScope.fullscreen = false;
    // $rootScope.pageLoaded = false;
    // $rootScope.toggleFullscreen = function() {
    //   $rootScope.pageLoaded = true;
    //   $rootScope.fullscreen = !$rootScope.fullscreen;
    //   // $rootScope.fullscreen ? $('.main').removeClass('animated bounceInRight').addClass('animated bounceOutRight') : $('.main').removeClass('animated bounceOutRight').addClass('animated bounceInRight');
    // }

}]);