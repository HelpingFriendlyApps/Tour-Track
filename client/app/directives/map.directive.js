'use strict'

app.directive('map', function(mapboxToken) {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    scope: {
      coordinates: '='
    },
    link: function(scope, element, attrs) {

      mapboxgl.accessToken = mapboxToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cijroc9jb006t90lx8ehn9k2v',
        center: scope.coordinates,
        zoom: 10
      });

      map.on('style.load', function() {
        var geoJson = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {
                // whatever i want
              },
              geometry: {
                type: 'Point',
                coordinates: scope.coordinates
              }
            }]
          }
        };

        map.addSource('show', geoJson);

        map.addLayer({
          id: 'something',
          // interactive: true,
          interactive: false,
          type: 'circle',
          source: 'show',
          paint: {
            'circle-radius': 30,
            'circle-color': 'black'
          }
        });
      });

    }
  };
});