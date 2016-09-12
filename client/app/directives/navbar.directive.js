'use strict'

angular.module('Tour-Track').directive('navbar', ['$rootScope', function($rootScope) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/navbar.html',
    link: function(scope, element, attrs) {

    }
  };
}]);