'use strict'

angular.module('Tour-Track').directive('map', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/directives/map/map.html',
    link: function(scope, element, attrs) {

    }
  };
}]);