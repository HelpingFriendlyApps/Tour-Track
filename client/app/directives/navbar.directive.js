'use strict'

angular.module('Tour-Track').directive('navbar', ['$rootScope', function($rootScope) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: '../views/directives/navbar.html',
    scope: {
      fullscreen: '='
    },
    link: function(scope, element, attrs) {

      scope.toggleFullscreen = function() {
        $rootScope.fullscreen = !$rootScope.fullscreen;
      }

      scope.fullscreenToFalse = function() {
        if($rootScope.fullscreen) $rootScope.fullscreen = false;
      }

    }
  };
}]);