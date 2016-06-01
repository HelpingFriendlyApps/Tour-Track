'use strict'

app.directive('profileMap', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/directives/profileMap.html',
    scope: {
      token: '='
    },
    link: function(scope, element, attrs) {

      mapboxgl.accessToken = scope.token;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/ciohlmagz000yaunty3tmlj5e',
        center: [-96.5, 39.5],
        zoom: 3,
        attributionControl: false
      });

    }

  };
}]);