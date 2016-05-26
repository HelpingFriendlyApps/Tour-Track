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
    }
  };

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

  MapFactory.addMapSource = function(sourceName, map, features, fitBounds) {
    if(!map.loaded()) {
      return map.on('load', function() {
        MapFactory.addMapSource(sourceName, map, features);
      });
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

    fitBounds ? map.fitBounds(getFitBounds(features)) : map.flyTo({ center: [-96.5, 39.5], zoom: 3 });

  }

  return MapFactory;

}]);