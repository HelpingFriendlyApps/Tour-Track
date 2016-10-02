'use strict'

angular.module('Tour-Track').directive('sidebar', ['$rootScope', function($rootScope) {
  return {
    // replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/sidebar.html',
    link: function(scope, element, attrs) {

    }
  };
}]);