'use strict'

app.directive('mapPopup', ["ShowFactory", "VenueFactory", function(ShowFactory, VenueFactory) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/directives/mapPopup.html',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      VenueFactory.getVenueById(scope.data.venue_id).then( (venue) => {
        scope.venue = venue;
      });

      ShowFactory.getShowsByVenueId(scope.data.venue_id).then( (shows) => {
        scope.shows = shows;
      });

    }

  };
}]);