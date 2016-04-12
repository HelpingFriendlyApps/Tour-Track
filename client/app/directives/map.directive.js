'use strict'

app.directive('map', function(mapboxToken) {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    scope: {
      coordinates: '='
    },
    link: function(scope, element, attrs) {

      // console.log('scope.coordinates', scope.coordinates)

      // scope.coordinates = scope.coordinates || [-73, 44];

      scope.$watch('coordinates', function(coordinates) {
        console.log('coordinates', coordinates)
        if(!coordinates[0]) {
          console.log('INVAL')
          coordinates = [-73, 44];
        }

        mapboxgl.accessToken = mapboxToken;
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/luismartins/cijroc9jb006t90lx8ehn9k2v',
          center: coordinates,
          zoom: 15
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
                  coordinates: coordinates
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



        
      })







    }
  };
});