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
      scope.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cin8guzrr0042agm8p2oszfz3',
        // center: scope.coordinates,
        center: [-98.35, 39.5],
        zoom: 5,
        // zoom: 13,
        attributionControl: false
      });


      scope.$watch('coordinates', function(coordinates) {
        if($state.current.name === 'show') return renderCurrentShow();
        renderRandomShows();
      });

      function renderRandomShows() {
        console.log('inside renderRandomShows')
        $interval.cancel(scope.randomShowInterval);
        var currentDate;

        ShowFactory.getRandomShow().then(function(show) {
          console.log('random show', show)
          currentDate = show.date;
          scope.map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, speed: 0.5});
        });

        scope.randomShowInterval = $interval(function() {
          console.log('currentDate', currentDate)
          ShowFactory.getNextShowByDate(currentDate).then(function(show) {
            console.log('interval running')
            currentDate = show.date;
            // scope.map.setCenter([show.longitude, show.latitude]);
            // scope.map.easeTo({center: [show.longitude, show.latitude], zoom: 13});
            scope.map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, speed: 0.5});
            // scope.map.panTo([show.longitude, show.latitude], {duration: 2000});
          });
        }, 3000);

        // scope.randomShowInterval = $interval(function() {
        //   ShowFactory.getRandomShow().then(function(show) {
        //     console.log('interval running')
        //     // scope.map.setCenter([show.longitude, show.latitude]);
        //     // scope.map.easeTo({center: [show.longitude, show.latitude], zoom: 13});
        //     scope.map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, speed: 0.5});
        //     // scope.map.panTo([show.longitude, show.latitude], {duration: 2000});
        //   });
        // }, 20000);


      }

      function renderCurrentShow() {
        if(!scope.coordinates) return renderRandomShows();
        console.log('inside renderCurrentShow')
        $interval.cancel(scope.randomShowInterval);
        // scope.map.setCenter(scope.coordinates);
        // scope.map.easeTo({center: scope.coordinates, zoom: 13});
        scope.map.flyTo({center: scope.coordinates, zoom: 13, minZoom: 10, speed: 0.5});
        // scope.map.panTo(scope.coordinates);
      }



      // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
          // console.log('STATE CHANGED', toState)
          // console.log('fromState', fromState)
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