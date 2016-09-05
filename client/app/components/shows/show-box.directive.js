'use strict'

angular.module('Tour-Track').directive('showBox', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/components/shows/show-box.html',
    // scope: {
    //   show: '='
    // },
    link: function(scope, element, attrs) {

    }
  };
}]);