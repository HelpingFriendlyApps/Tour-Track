'use strict'

app.directive('map', function(mapboxToken) {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    link: function(scope, element, attrs) {

      console.log('scope.show', scope.show)

      mapboxgl.accessToken = mapboxToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cijroc9jb006t90lx8ehn9k2v',
        center: [scope.show.longitude, scope.show.latitude],
        zoom: 15
      });


    }
  };
});