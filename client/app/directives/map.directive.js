'use strict'

app.directive('map', function(mapboxToken, $interval, $state) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/directives/map.html',
    scope: {
      coordinates: '=',
      fullscreen: '='
    },
    link: function(scope, element, attrs) {

      scope.toggleFullscreen = function() {
        scope.fullscreen = !scope.fullscreen;
        scope.fullscreen ? $('.main').addClass('animated bounceOutRight') : $('.main').removeClass('bounceOutRight').addClass('animated bounceInRight');
      }

      scope.$watch('coordinates', function(coordinates) {
        if(!coordinates) scope.coordinates = ['-104.89', '39.81'];
        console.log('coordinates', coordinates)
        console.log('$state', $state)
        

        mapboxgl.accessToken = mapboxToken;
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/luismartins/cin8guzrr0042agm8p2oszfz3',
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

          // map.dragPan.disable();
          map.scrollZoom.disable();



      });



      // scope.$watch('fullscreen', function(fullscreen) {
      //   if(fullscreen) {
      //     map.dragPan.enable();
      //     map.scrollZoom.enable();
      //     // $('body').css('overflow', 'hidden');
      //   } else {
      //     // map.dragPan.disable();
      //     map.scrollZoom.disable();
      //     // $('body').css('overflow', 'auto');
      //   }
      //   $interval( () => {
      //     map.resize();
      //   }, 10, 200);
      // });


      });

    }
  };
});