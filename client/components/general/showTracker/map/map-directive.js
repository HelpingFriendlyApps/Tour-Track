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
      madeUpVal: '=',
      currentView: '='
    },
    link: function(scope, element, attrs) {

      var venueSourceAdded = false;

      mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/luismartins/ciio2ede4007uzwmaourk3stv',
        center: [-77.38, 39],
        zoom: 3
      });

      map.on('style.load', function() {
        if(scope.shows && scope.venues) {
          if(!venueSourceAdded) {
            MapFactory.addVenuesSource(map, scope.shows, scope.venues);
            venueSourceAdded = true;
          }
          MapFactory.addVenuesLayer(map, scope.shows, scope.venues);
        }
      });

      scope.$watchGroup(['shows', 'venues'], function(newVals) {
        if(newVals[0] && newVals[1]) {
          if(!venueSourceAdded) {
            MapFactory.addVenuesSource(map, newVals[0], newVals[1]);
            venueSourceAdded = true;
          }
          console.log('venueSourceAdded', venueSourceAdded)
          MapFactory.addVenuesLayer(map, newVals[0], newVals[1]);
        }
      }, true);
      
      scope.$watch('filteredShows', function(filteredShows, oldFilteredShows) {
        console.log('filteredShows', filteredShows)
        if(filteredShows) MapFactory.addFilteredShowsLayer(map, filteredShows);
        if(filteredShows === null) MapFactory.addVenuesLayer(map, scope.shows, scope.venues);
      }, true);
     
      scope.$watch('currentShow', function(currentShow) {
        console.log('currentShow', currentShow)
        if(currentShow) MapFactory.addCurrentShowLayer(map, currentShow);
        if(currentShow === null) {
          var filteredViews = ['years', 'tours', 'venues'];
          if(filteredViews.includes(scope.currentView)) MapFactory.addVenuesLayer(map, scope.shows, scope.venues);
          if(scope.currentView === 'shows') MapFactory.addFilteredShowsLayer(map, scope.filteredShows);
        }
      }, true);

      scope.$watch('currentView', function(currentView) {
        // if(currentView) console.log('currentView', currentView)
      }, true);

      scope.$watch('madeUpVal', function(val) {
        if(val) console.log(map.getSource('venues').style._layers)
        // console.log('MAP', map)
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




    }
  };
});