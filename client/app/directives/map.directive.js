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


        // // THIS WORKS
        // if($rootScope.fullscreen) {
        //   // $('.main').addClass('out').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);
        //   // $('.main').addClass('out').one('transform', doSomething);
        //   $('.main').addClass('out transistion').removeClass('ui-view');
        //   $timeout(function() {
        //     console.log('HELLO')
        //     $('.main').removeClass('in transistion');
        //   }, 1500);
        // }
        // if(!$rootScope.fullscreen) {
        //   $('.main').addClass('in transistion');
        //   $timeout(function() {
        //     $('.main').removeClass('in out transistion');
        //   }, 1500);
        // } // STOP HERE



        // $('.main').one('out', doSomething);

        // function doSomething() {
        //   console.log('do something', $rootScope.fullscreen)
        //   // if($rootScope.fullscreen) return;
        //   $('.main').removeClass('-webkit-transition -moz-transition -o-transition transform');
        //   console.log('did something')
        // }




        // console.log('adding animation')
        
        // var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        // if($rootScope.fullscreen) {
        //   console.log('adding FULLSCREEN animation')
        //   $('.main').removeClass('bounceInRight').addClass('animated bounceOutRight').one(animationEnd, function() {
        //     console.log('inside one')
        //     if(!$rootScope.fullscreen) return;
        //     console.log('passed one')
        //     $(this).addClass('zero-opacity');
        //   });
        // }

        // if(!$rootScope.fullscreen) {
        //   console.log('adding NOT FULLSCREEN animation')
        //   $('.main').removeClass('zero-opacity bounceOutRight').addClass('bounceInRight');
        //   // $('.main').removeClass('bounceOutRight').addClass('bounceInRight').one(animationEnd, function() {
        //   //   $(this).removeClass('zero-opacity');
        //   // });
        // }

      }, true);

      mapboxgl.accessToken = scope.token;
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/cinlzt02m0019b6nlyaq6pfwt',
        center: [-98.35, 39.5],
        zoom: 5,
        // zoom: 10,
        attributionControl: false
      });

      map.off('style.error', map.onError);
      map.off('source.error', map.onError);
      map.off('tile.error', map.onError);
      map.off('layer.error', map.onError);


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



      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        console.log('inside stateChangeStart')
        // if($rootScope.fullscreen) $rootScope.fullscreen = false;

        // if(fromState.name ==='show' && toState.name !== 'show') renderRandomShows();
        // $('.main').removeClass('animated bounceOutRight').addClass('animated bounceInRight');
      });



      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        console.log('inside stateChangeSuccess')
        // if($rootScope.fullscreen) $rootScope.fullscreen = false;
        if(fromState.name ==='show' && toState.name !== 'show') renderRandomShows();

        // if($rootScope.fullscreen) {
        //   $timeout(function() {
        //     $rootScope.fullscreen = false;
        //   }, 3000);
        // }

        // if(!scope.pageLoaded) return scope.pageLoaded = true;
        // console.log('adding animation')
        // $('.main').removeClass('animated bounceOutRight').addClass('animated bounceInRight');
        // if(scope.fullscreen) scope.toggleFullscreen();
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
}]);