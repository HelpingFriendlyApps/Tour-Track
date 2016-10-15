'use strict'

angular.module('Tour-Track').directive('playlist', ['$rootScope', function($rootScope) {
  return {
    // replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/playlist.html',
    link: function(scope, element, attrs) {

    }
  };
}]);