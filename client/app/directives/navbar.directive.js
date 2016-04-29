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
        console.log('IN IT boobs')
        $rootScope.fullscreen = false;
      }

    }
  };
}]);