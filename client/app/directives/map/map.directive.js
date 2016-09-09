'use strict'

angular.module('Tour-Track').directive('map', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/directives/map/map.html',
    scope: {
      token: '=',
      lngLat: '='
    },
    link: function(scope, element, attrs) {

      console.log('scope.lngLat', scope.lngLat)

      mapboxgl.accessToken = scope.token;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/ciohlmagz000yaunty3tmlj5e',
        center: scope.lngLat,
        zoom: 5,
        attributionControl: false
      });

    }
  };
}]);