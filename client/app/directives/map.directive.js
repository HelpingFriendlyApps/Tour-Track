'use strict'

app.directive('map', function($rootScope, mapboxToken, $interval, $state, ShowFactory) {
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

      mapboxgl.accessToken = mapboxToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cin8guzrr0042agm8p2oszfz3',
        center: [-98.35, 39.5],
        zoom: 5,
        attributionControl: false
      });

      // map.off('style.error', map.onError);
      // map.off('source.error', map.onError);
      // map.off('tile.error', map.onError);
      // map.off('layer.error', map.onError);


      scope.$watch('coordinates', function(coordinates) {
        if($state.current.name === 'show') return renderCurrentShow();
        renderRandomShows();
      });

      function renderRandomShows() {
        $interval.cancel(scope.randomShowInterval);
        var currentDate;

        ShowFactory.getRandomShow().then(function(show) {
          currentDate = show.date;
          map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, screenSpeed: 0.7});
        });

        scope.randomShowInterval = $interval(function() {
          ShowFactory.getNextShowByDate(currentDate).then(function(show) {
            currentDate = show.date;
            map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, screenSpeed: 0.7});
          });
        }, 10000);
      }

      function renderCurrentShow() {
        if(!scope.coordinates) return renderRandomShows();
        $interval.cancel(scope.randomShowInterval);
        map.flyTo({center: scope.coordinates, zoom: 13, minZoom: 10, speed: 1.2});
      }

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        if(fromState.name ==='show' && toState.name !== 'show') renderRandomShows();
      });





        // map.on('style.load', function() {
        //   var geoJson = {
        //     type: 'geojson',
        //     data: {
        //       type: 'FeatureCollection',
        //       features: [{
        //         type: 'Feature',
        //         properties: {
        //           // whatever i want
        //         },
        //         geometry: {
        //           type: 'Point',
        //           coordinates: scope.coordinates
        //         }
        //       }]
        //     }
        //   };

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
          // map.scrollZoom.disable();



      // });



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



    }
  };
});