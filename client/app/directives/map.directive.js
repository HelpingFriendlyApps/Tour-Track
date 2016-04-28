'use strict'

app.directive('map', function(mapboxToken, $interval) {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    scope: {
      coordinates: '=',
      fullscreen: '='
    },
    link: function(scope, element, attrs) {

      scope.coordinates = ['-104.89', '39.81'];

      scope.$watch('fullscreen', function(fullscreen) {
        if(fullscreen) {
          map.dragPan.enable();
          map.scrollZoom.enable();
          $('body').css('overflow', 'hidden');
        } else {
          map.dragPan.disable();
          map.scrollZoom.disable();
          $('body').css('overflow', 'auto');
        }
        $interval( () => {
          map.resize();
        }, 10, 200);
      });

      mapboxgl.accessToken = mapboxToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cijroc9jb006t90lx8ehn9k2v',
        center: scope.coordinates,
        zoom: 10,
        attributionControl: false
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

        // map.addSource('show', geoJson);

        // map.addLayer({
        //   id: 'something',
        //   // interactive: true,
        //   interactive: false,
        //   type: 'circle',
        //   source: 'show',
        //   paint: {
        //     'circle-radius': 30,
        //     'circle-color': 'black'
        //   }
        // });

        map.dragPan.disable();
        map.scrollZoom.disable();

      });

    }
  };
});