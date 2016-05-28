'use strict'

app.directive('map', ["$rootScope", "$state", "MapFactory", "VenueFactory", function($rootScope, $state, MapFactory, VenueFactory) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/directives/map.html',
    scope: {
      token: '=',
      allShows: '=',
      filteredShows: '=',
      currentShow: '=',
      currentSongPerformances: '='
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
      MapFactory.setMap(map);

      VenueFactory.getAllVenues().then( (venues) => {
        let allVenues = venues;
        MapFactory.addMapSource('allVenues', MapFactory.createVenueFeatures(allVenues), {beforeId: 'currentShow'});
      });

      scope.$watch('filteredShows', function(filteredShows) {
        if(!filteredShows) return;
        if(!filteredShows.length || filteredShows.length === scope.allShows.length) {
          MapFactory.removeMapSourceIfExists('filteredShows');
          map.flyTo({ center: [-96.5, 39.5], zoom: 3 });
          return;
        }

        if(filteredShows.length !== scope.allShows.length) {
          MapFactory.addMapSource('filteredShows', MapFactory.createShowFeatures(filteredShows), {fitBounds: true});
          map.setPaintProperty('allVenues', 'circle-opacity', 0.5);
        } 

      });

      scope.$watch('currentShow', function(currentShow) {
        if(!currentShow) return MapFactory.removeMapSourceIfExists('currentShow');
        MapFactory.addMapSource('currentShow', MapFactory.createShowFeatures([currentShow]), {fitBounds: true});
      });

      scope.$watch('currentSongPerformances', function(currentSongPerformances) {
        console.log('currentSongPerformances', currentSongPerformances)
        if(!currentSongPerformances) return MapFactory.removeMapSourceIfExists('currentSongPerformances');
        MapFactory.addMapSource('currentSongPerformances', MapFactory.createShowFeatures(currentSongPerformances), {fitBounds: true});
      });

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name !== "mapLeft.shows") {
          scope.filteredShows = [];
        }
        if(toState.name !== "mapLeft.show") {
          scope.currentShow = null;
        }
        if(toState.name !== "mapLeft.song") {
          scope.currentSongPerformances = null;
        }
      });

      map.on('click', function(e) {
        let features = map.queryRenderedFeatures(e.point, {layers: ['currentSongPerformances']});

        if(!features.length) return;
        let feature = features[0];

        var popup = new mapboxgl.Popup()
          .setLngLat(feature.geometry.coordinates)
          .setHTML('<div>Poop</div>')
          .addTo(map);
      });

      map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point, {layers: ['currentSongPerformances']});
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      });

    }

  };
}]);



















// 'use strict'

// app.directive('map', ["$rootScope", "$interval", "$timeout", "$state", "ShowFactory", function($rootScope, $interval, $timeout, $state, ShowFactory) {
//   return {
//     restrict: 'E',
//     replace: true,
//     templateUrl: '../views/directives/map.html',
//     scope: {
//       coordinates: '=',
//       fullscreen: '=',
//       token: '='
//     },
//     link: function(scope, element, attrs) {
      
//       scope.$watch('fullscreen', function(newVal, oldVal) {
//         $rootScope.fullscreen ? $('.main').removeClass('bounceInRight').addClass('animated bounceOutRight') : $('.main').removeClass('bounceOutRight').addClass('bounceInRight');
//       }, true);

//       // mapboxgl.accessToken = scope.token;
//       mapboxgl.accessToken = "pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ";
//       var map = new mapboxgl.Map({
//         container: 'map',
//         // style: 'mapbox://styles/luismartins/cinlzt02m0019b6nlyaq6pfwt',
//         style: 'mapbox://styles/luismartins/ciohlmagz000yaunty3tmlj5e',
//         center: [-98.35, 39.5],
//         zoom: 5,
//         attributionControl: false
//       });

//       scope.$watch('coordinates', function(coordinates) {
//         if($state.current.name === 'show') return renderCurrentShow();
//         renderRandomShows();
//       });

//       function renderRandomShows() {

//         // For testing purposes
//         map.setCenter([-98.35, 39.5]);
//         return;

//         $interval.cancel(scope.randomShowInterval);
//         var currentDate;

//         ShowFactory.getRandomShow().then(function(show) {
//           currentDate = show.date;
//           map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, screenSpeed: 0.7});
//         });

//         scope.randomShowInterval = $interval(function() {
//           ShowFactory.getNextShowByDate(currentDate).then(function(show) {
//             currentDate = show.date;
//             map.flyTo({center: [show.longitude, show.latitude], zoom: 13, minZoom: 10, screenSpeed: 0.7});
//           });
//         }, 10000);
//       }

//       function renderCurrentShow() {
//         if(!scope.coordinates) return renderRandomShows();
//         $interval.cancel(scope.randomShowInterval);

//         // For testing purposes
//         // map.flyTo({center: scope.coordinates, zoom: 13, minZoom: 10, speed: 1.2});
//       }

//       $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//         if(fromState.name ==='show' && toState.name !== 'show') renderRandomShows();
//       });

//     }
//   };
// }]);