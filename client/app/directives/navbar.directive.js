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

      scope.fullscreenToFalse = function() {
        console.log('IN FULLSCREEN TO FALSE')
        if($rootScope.fullscreen) $rootScope.fullscreen = false;
        console.log('$rootScope.fullscreen', $rootScope.fullscreen)
      }

    }
  };
}]);