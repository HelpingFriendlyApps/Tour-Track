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

    var venueShowCount = {};
    shows.forEach(function(show) {
      venueShowCount[show.venue_id] =  venueShowCount[show.venue_id] || [];
      venueShowCount[show.venue_id].push(show.id);
    });

    for(var i = 0; i < venues.length; i++) {
      if(!venueShowCount[venues[i].id]) continue;
      geoJson.data.features.push({
        type: 'Feature',
        properties: {
          venue_id: venues[i].id,
          show_count: venueShowCount[venues[i].id].length
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


  return {

    addVenuesLayer: function(map, shows, venues) {
      map.addSource('venues', geoJsonConverter(shows, venues))
      var breaks = [0, 5, 10, 15, 20, 25, 30, 35, 40];
      for (var i = 0; i < breaks.length; i++) {
        var filters;
        if(i < breaks.length-1) {
          filters = ['all',
            ['>=', 'show_count', breaks[i]],
            ['<', 'show_count', breaks[i+1]]
          ];
        } else {
          filters = ['all',
            ['>=', 'show_count', breaks[i]]
          ];
        }

        map.addLayer({
          id: 'venues-' + i,
          interactive: true,
          type: 'circle',
          source: 'venues',
          paint: {
            'circle-radius': (i+1)*3,
            'circle-color': '#962D3E'
          },
          filter: filters
        });

      }
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