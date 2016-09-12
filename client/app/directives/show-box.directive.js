'use strict'

angular.module('Tour-Track').directive('showBox', ['ShowFactory', 'TourFactory', function(ShowFactory, TourFactory) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/show-box.html',
    scope: {
      show: '='
    },
    link: function(scope, element, attrs) {

      console.log('scope.show', scope.show)

      ShowFactory.getSetlistByShowId(scope.show.id).then(setlist => {
        scope.sets = ShowFactory.splitSetlistBySet(setlist);
      });

      TourFactory.getTourById(scope.show.tour_id).then(tour => {
        scope.tourName = tour.name;
      });

    }
  };
}]);