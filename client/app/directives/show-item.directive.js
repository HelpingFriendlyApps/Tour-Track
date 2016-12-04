'use strict'

angular.module('Tour-Track').directive('showItem', ['ShowFactory', 'TourFactory', function(ShowFactory, TourFactory) {
  return {
    // replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/show-item.html',
    scope: {
      show: '='
    },
    link: function(scope, element, attrs) {

      ShowFactory.getSetlistByShowId(scope.show.id).then(setlist => {
        scope.sets = ShowFactory.splitSetlistBySet(setlist);
        // console.log('scope.sets', scope.sets)
      });

      TourFactory.getTourById(scope.show.tour_id).then(tour => {
        scope.tourName = tour.name;
        // console.log('scope.tourName', scope.tourName)
      });

    }
  };
}]);