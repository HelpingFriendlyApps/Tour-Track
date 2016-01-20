'use strict'

angular.module('Tour-Track').directive('map', function(General, MapFactory) {
  return {
    restrict: 'E',
    replace: true,
    // require: '^ngController',
    template: '<div id="map"></div>',
    scope: {
      shows: '=',
      venues: '=',
      progress: '=',
      currentShow: '=',
      filteredShows: '=',
      clickedShow: '=',
      clickedVenueId: '=',
      clickedVenueBroadcast: '&',
      madeUpVal: '='
    },
    link: function(scope, element, attrs) {

      mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/ciio2ede4007uzwmaourk3stv',
        center: [-77.38, 39],
        zoom: 3
      });

      // map.on('style.load', function() {
        // if(scope.shows) MapFactory.addShowsLayer(map, scope.shows);
        // if(scope.shows) MapFactory.addVenuesLayer(map, scope.shows);
        // if(scope.venues) MapFactory.addVenuesLayer(map, scope.venues);
      // });
      
      scope.$watch('shows', function(shows) {
          // if(shows) MapFactory.addVenuesLayer(map, shows);
          // if(shows) MapFactory.addShowsLayer(map, shows);
      }, true);

      // scope.$watch('venues', function(venues) {
      //   if(venues) {
      //     console.log('venues', venues)
      //     MapFactory.addVenuesLayer(map, venues);
      //   }
      // }, true);

      scope.$watchGroup(['shows', 'venues'], function(newVals) {
        if(newVals[0] && newVals[1]) {
          var shows = newVals[0];
          var venues = newVals[1];
          console.log('shows', shows)
          console.log('venues', venues)
          MapFactory.addVenuesLayer(map, shows, venues);
        }
      })

      scope.$watch('madeUpVal', function(val) {
        // map.setPaintProperty('venues', 'circle-radius', val);
        // map.setFilter('venues', ['==', 'venue_id', 408]);
      }, true);

      // map.on('click', function(e) {
      //     map.featuresAt(e.point, {layer: 'venues', radius: 15, includeGeometry: true}, function(err, features) {
      //         if(err) throw err;
      //         if(features.length) {
      //             map.flyTo({center: features[0].geometry.coordinates});
      //             scope.clickedVenueId = features[0].properties.venue_id;
      //             // SCOPE.CLICKEDVENUEID ONLY REACHES INFOVIEWER CTRL AFTER 1+ MINUTES
      //             scope.clickedVenueBroadcast();
      //             // General.getShowWithVenueInfoById(features[0].properties.show_id).then( (show) => {
      //             //     scope.clickedShow = show[0];
      //             // });
      //             // General.allShowsByVenueId(features[0].properties.venue_id).then(function(shows) {
      //             //     scope.showsByClickedVenue = shows;
      //             //     console.log('scope.showsByClickedVenue', scope.showsByClickedVenue)
      //             // })
      //         }
      //     });
      // });

      // map.on('mousemove', function(e) {
      //     map.featuresAt(e.point, {layer: 'venues', radius: 15}, function(err, features) {
      //         if(err) throw err;
      //         map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      //     });
      // });

      // scope.$watch('filteredShows', function(filteredShows) {
      //     if(filteredShows) MapFactory.addFilteredShowsLayer(map, filteredShows);
      //     if(filteredShows === null) MapFactory.resetFilteredShowsLayer(map);
      // }, true);

      // scope.$watch('currentShow', function(currentShow) {
      //     if(currentShow) MapFactory.addCurrentShowLayer(map, currentShow);
      //     if(currentShow === null) MapFactory.resetCurrentShowLayer(map, scope.filteredShows)
      // }, true);


    }
  };
});