'use strict'

app.directive('map', ["$rootScope", "$interval", "$timeout", "$state", "ShowFactory", function($rootScope, $interval, $timeout, $state, ShowFactory) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../views/directives/map.html',
    scope: {
      coordinates: '=',
      fullscreen: '=',
      token: '='
    },
    link: function(scope, element, attrs) {
      
      scope.toggleFullscreen = function() {
        $rootScope.fullscreen = !$rootScope.fullscreen;
      }

      scope.$watch('fullscreen', function(newVal, oldVal) {
        $rootScope.fullscreen ? $('.main').removeClass('bounceInRight').addClass('animated bounceOutRight') : $('.main').removeClass('bounceOutRight').addClass('bounceInRight');
      }, true);

      mapboxgl.accessToken = scope.token;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cinlzt02m0019b6nlyaq6pfwt',
        center: [-98.35, 39.5],
        zoom: 5,
        attributionControl: false
      });

      scope.$watch('coordinates', function(coordinates) {
        if($state.current.name === 'show') return renderCurrentShow();
        renderRandomShows();
      });

      function renderRandomShows() {

        // For testing purposes
        map.setCenter([-98.35, 39.5]);
        return;

        

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

    }
  };
}]);