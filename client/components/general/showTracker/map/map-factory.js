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
    shows.forEach( (show) => {
      showsPerVenue[show.venue_id] =  showsPerVenue[show.venue_id] || [];
      showsPerVenue[show.venue_id].push(show.id);
    });
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

  var currentLayers = [];

  function removeCurrentLayers(map) {
    while(currentLayers.length) map.removeLayer(currentLayers.shift());
  }

  return {

    addVenuesSource: function(map, shows, venues) {
      map.addSource('venues', geoJsonConverter(shows, venues));
    },

    addVenuesLayer: function(map, shows, venues) {
      if(currentLayers.length) removeCurrentLayers(map);
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
        currentLayers.push('venues-' + i);
      }
      map.flyTo(startingPoint);
    },
    
    addFilteredShowsLayer: function(map, filteredShows) {
      if(currentLayers.length) removeCurrentLayers(map);
      var venueIds = [];
      for (var j = 0; j < filteredShows.length; j++) {
        venueIds.push(filteredShows[j].venue_id);
      }
      var filter = ['in', 'venue_id', ...venueIds];
      map.addLayer({
        id: 'filteredShows',
        interactive: true,
        type: 'circle',
        source: 'venues',
        paint: {
          'circle-radius': 10,
          'circle-color': '#962D3E'
        },
        filter: filter
      });
      map.fitBounds(getBounds(filteredShows));
      currentLayers.push('filteredShows');
    },
    
    addCurrentShowLayer: function(map, currentShow) {
      if(currentLayers.length) removeCurrentLayers(map);
      var filter = ['in', 'venue_id', currentShow.venue_id];
      map.addLayer({
        id: 'currentShow',
        interactive: true,
        type: 'circle',
        source: 'venues',
        paint: {
          'circle-radius': 15,
          'circle-color': 'blue'
        },
        filter: filter
      });
      map.flyTo({
        center: [currentShow.longitude, currentShow.latitude],
        zoom: 13
      });
      currentLayers.push('currentShow');
    }

  }

});