'use strict'

angular.module('Tour-Track').directive('showBox', ['ShowFactory', function(ShowFactory) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/components/shows/show-box.html',
    scope: {
      show: '='
    },
    link: function(scope, element, attrs) {

      ShowFactory.getSetlistByShowId(scope.show.id).then(setlist => {
        console.log('setlist', setlist);
      });

    }
  };
}]);