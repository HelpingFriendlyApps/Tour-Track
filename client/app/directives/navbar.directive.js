'use strict'

angular.module('Tour-Track').directive('navbar', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: '../views/directives/navbar.html',
    link: function(scope, element, attrs) {

    }
  };
}]);