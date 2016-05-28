angular.module('Tour-Track')
.factory('MapFactory', [function() {

  let MapFactory = {};
  let map;
  let mapLoaded = false;
  let activeSources = [];

  let sourceOptions = {
    allVenues: {
      color: '#F25F5C'
    },
    filteredShows: {
      color: '#FFE066',
      radius: 7
    },
    currentShow: {
      color: '#FFE066',
      radius: 7
    },
    currentSongPerformances: {
      color: '#FFE066',
      radius: 7
    }
  };


  function getBounds(features) {
    let longitudes = [], latitudes = [];
    features.forEach( (feature) => {
      longitudes.push(feature.geometry.coordinates[0]);
      latitudes.push(feature.geometry.coordinates[1]);
    });
    return [
      [Math.min(...longitudes) - 0.01, Math.min(...latitudes) - 0.01],
      [Math.max(...longitudes) + 0.01, Math.max(...latitudes) + 0.01]
    ];
  }
  
  function updateStyles() {
    if(activeSources.includes('allVenues')) {
      map.setPaintProperty('allVenues', 'circle-opacity', 1);
      // if(activeSources.includes('filteredShows') || activeSources.includes('currentShow')) map.setPaintProperty('allVenues', 'circle-opacity', 0.5);
      if(activeSources.length > 1) map.setPaintProperty('allVenues', 'circle-opacity', 0.5);
    }
  }

  MapFactory.setMap = function(mapObj) {
    map = mapObj;
  }

  MapFactory.createVenueFeatures = function(venues) {
    let VenueObj = function(venue) {
      this.type = 'Feature',
      this.properties = { venue_id: venue.id, venue_name: venue.name },
      this.geometry = { type: 'Point', coordinates: [venue.longitude, venue.latitude] }
    }

    return venues.map( (venue) => {
      return new VenueObj(venue);
    });
  }

  MapFactory.createShowFeatures = function(shows) {
    let ShowObj = function(show) {
      this.type = 'Feature',
      this.properties = {
        venue_id: show.venue_id,
        venue_name: show.venue_name,
        show_id: show.id,
        show_date: show.date
      },
      this.geometry = { type: 'Point', coordinates: [show.longitude, show.latitude] }
    }

    return shows.map( (show) => {
      return new ShowObj(show);
    });
  }

  MapFactory.addMapSource = function(sourceName, features, options) {
    let params = arguments,
      fitBounds = options && options.fitBounds ? options.fitBounds : false,
      beforeId = options && options.beforeId ? options.beforeId : "";


    if(!mapLoaded && !map.loaded()) {
      return map.on('load', function() {
        mapLoaded = true;
        MapFactory.addMapSource(...params);
      });
    }

    if(activeSources.indexOf(sourceName) < 0) activeSources.push(sourceName);

    if(map.getSource(sourceName)) {
      map.removeLayer(sourceName).removeSource(sourceName);
    }

    map.addSource(sourceName, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    map.addLayer({
      id: sourceName,
      interactive: true,
      type: 'circle',
      source: sourceName,
      paint: {
        'circle-radius': sourceOptions[sourceName].radius || 5,
        'circle-color': sourceOptions[sourceName].color
      }
    }, beforeId);

    updateStyles();
    if(fitBounds) map.fitBounds(getBounds(features));
  }

  MapFactory.removeMapSourceIfExists = function(id) {
    if(map.getSource(id)) {
      map.removeLayer(id).removeSource(id);

      var index = activeSources.indexOf(id);
      activeSources.splice(index, 1);

      updateStyles();
    }
  }

  return MapFactory;

}]);