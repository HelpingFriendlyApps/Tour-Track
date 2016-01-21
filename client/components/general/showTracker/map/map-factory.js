'use strict';

angular.module('Tour-Track').factory('MapFactory', function($http) {
  
  var startingPoint = { center: [-77.38, 39], zoom: 3 };

  function geoJsonConverter(shows, venues) {
    var geoJson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: []
      }
    };
    var showsPerVenue = {};
    shows.forEach(function(show) {
      showsPerVenue[show.venue_id] =  showsPerVenue[show.venue_id] || [];
      showsPerVenue[show.venue_id].push(show.id);
    });
    console.log('showsPerVenue', showsPerVenue)
    for(var i = 0; i < venues.length; i++) {
      if(!showsPerVenue[venues[i].id]) continue;
      geoJson.data.features.push({
        type: 'Feature',
        properties: {
          venue_id: venues[i].id,
          show_count: showsPerVenue[venues[i].id].length
        },
        geometry: {
          type: 'Point',
          coordinates: [venues[i].longitude, venues[i].latitude]
        }
      });
    }
    return geoJson;
  }


  function getBounds(shows) {
    var longitudes = [],
      latitudes = [];
    shows.forEach( (show) => {
      longitudes.push(show.longitude);
      latitudes.push(show.latitude);
    });
    return [
      [Math.min(...longitudes)-1, Math.min(...latitudes)-1],
      [Math.max(...longitudes)+1, Math.max(...latitudes)+1]
    ];
  }

  var showCountFilters = [];
  for (var i = 0; i < 10; i++) {
    var filter;
    if(i < showCountFilters.length - 1) {
      filter = ['all',
        ['>=', 'show_count', i * 3],
        ['<', 'show_count', (i+1)*3]
      ];
    } else {
      filter = ['all',
        ['>=', 'show_count', i * 3]
      ];
    }
    showCountFilters.push(filter);
  }

  return {

    currentLayer: 'all',

    addVenuesLayer: function(map, shows, venues) {
      map.addSource('venues', geoJsonConverter(shows, venues))
      for (var i = 0; i < showCountFilters.length; i++) {
        map.addLayer({
          id: 'venues-' + i,
          interactive: true,
          type: 'circle',
          source: 'venues',
          paint: {
            'circle-radius': (i+1)*2,
            'circle-color': '#962D3E'
          },
          filter: showCountFilters[i]
        });
      }
    },

    addFilteredShowsLayer: function(map, filteredShows) {
      var venueIds = [];
      for (var j = 0; j < filteredShows.length; j++) {
        venueIds.push(filteredShows[j].venue_id);
      }
      var filter = ['in', 'venue_id', ...venueIds];
      for (var i = 0; i < showCountFilters.length; i++) {
        map.setPaintProperty('venues-' + i, 'circle-radius', 5)
          .setFilter('venues-' + i, filter)
          .fitBounds(getBounds(filteredShows));
      }
    },

    resetFilteredShowsLayer: function(map) {
      for (var i = 0; i < showCountFilters.length; i++) {
        map.setPaintProperty('venues-' + i, 'circle-radius', (i+1)*2)
          .setFilter('venues-' + i, showCountFilters[i])
          .flyTo(startingPoint);
      }
    },

    addCurrentShowLayer: function() {

    }



        

  //       addShowsLayer: function(map, shows) {
    //  map.addSource('shows', geoJsonConverter(shows))
    //    .addLayer({
  //               id: "shows",
  //               interactive: true,
  //               type: "circle",
  //               source: "shows",
  //               paint: {
  //                   'circle-radius': 8,
  //                   'circle-color': 'rgba(55,148,179,1)'
  //               }
  //           });
    // },

    // addFilteredShowsLayer: function(map, filteredShows) {
    //  map.addSource('filteredShows', geoJsonConverter(filteredShows))
    //    .addLayer({
  //               id: "filteredShows",
  //               type: "circle",
  //               source: "filteredShows",
  //               paint: {
  //                   'circle-radius': 10,
  //                   'circle-color': 'red'
  //               }})
  //             .fitBounds(getBounds(filteredShows));
    // },

  //       resetFilteredShowsLayer: function(map) {
  //           map.removeSource('filteredShows')
  //             .removeLayer('filteredShows')
  //             .flyTo(startingPoint);
  //       },

    // addCurrentShowLayer: function(map, currentShow) {
    //  map.addSource('currentShow', geoJsonConverter([currentShow]))
  //             .addLayer({
  //               id: "currentShow",
  //               type: "circle",
  //               source: "currentShow",
  //               paint: {
  //                   'circle-radius': 5,
  //                   'circle-color': 'white'
  //               }})
  //             .flyTo({
  //               center: [currentShow.longitude, currentShow.latitude],
  //               zoom: 13
  //           });
    // },

  //       resetCurrentShowLayer: function(map, filteredShows) {
  //           map.removeSource('currentShow')
  //             .removeLayer('currentShow');
  //           if(filteredShows) map.fitBounds(getBounds(filteredShows));
  //           else map.flyTo({ center: [-77.38, 39], zoom: 3 });
  //       }

  }

});