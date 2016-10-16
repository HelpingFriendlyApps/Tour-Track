'use strict'

angular.module('Tour-Track').directive('show', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/show.html',
    scope: {
      show: '='
    },
    link: function(scope, element, attrs) {

    }
  };
}]);