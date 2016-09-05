'use strict'

angular.module('Tour-Track').directive('songBox', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/components/songs/song-box.html',
    scope: {
      song: '='
    },
    link: function(scope, element, attrs) {

    }
  };
}]);