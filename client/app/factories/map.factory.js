angular.module('Tour-Track')
.factory('MapFactory', [function() {

  let MapFactory = {};

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
    }
  };

  let activeSources = [];

  function getFitBounds(features) {
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

  // let queuedSources = [];

  MapFactory.addMapSource = function(sourceName, map, features, fitBounds) {
    console.log('arguments', arguments, map.loaded())
    fitBounds = fitBounds || false;
    if(!map.loaded()) {
      return map.on('load', function() {
        MapFactory.addMapSource(sourceName, map, features, fitBounds)
      });
    }

    console.log('arguments BELOW', arguments)

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
    });

    if(sourceName !== 'allVenues') activeSources.push(sourceName);

    fitBounds ? map.fitBounds(getFitBounds(features)) : map.flyTo({ center: [-96.5, 39.5], zoom: 3 });
    // if(fitBounds) map.fitBounds(getFitBounds(features));
  }

  MapFactory.removeMapSourceIfExists = function(map, id) {
    if(map.getSource(id)) {
      map.removeLayer(id).removeSource(id);
    }
  }

  MapFactory.removeActiveSources = function(map) {
    console.log('activeSources', activeSources)
  }

  return MapFactory;

}]);