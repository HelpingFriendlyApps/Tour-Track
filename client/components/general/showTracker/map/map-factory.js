'use strict';

angular.module('Tour-Track')
.factory('MapFactory', function($http) {
	
	var filteredShowsRendered = false;

	function geoJsonConverter(shows) {
		var geoJson = {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: []
            }
        };
        for(var i = 0; i < shows.length; i++) {
            if(shows[i].latitude && shows[i].longitude) {
                geoJson.data.features.push({
                    type: 'Feature',
                    properties: {
                        // show_id: shows[i].id
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [shows[i].longitude, shows[i].latitude]
                    }
                });
            }
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

		addShowsLayer: function(map, shows) {
			map.addSource('shows', geoJsonConverter(shows))
			  .addLayer({
                id: "shows",
                interactive: true,
                type: "circle",
                source: "shows",
                paint: {
                    'circle-radius': 8,
                    'circle-color': 'rgba(55,148,179,1)'
                }
            });
		},

		addFilteredShowsLayer: function(map, filteredShows) {
			map.addSource('filteredShows', geoJsonConverter(filteredShows))
			  .addLayer({
                id: "filteredShows",
                type: "circle",
                source: "filteredShows",
                paint: {
                    'circle-radius': 10,
                    'circle-color': 'red'
                }})
              .fitBounds(getBounds(filteredShows));
		},

        resetFilteredShowsLayer: function(map) {
            map.removeSource('filteredShows')
              .removeLayer('filteredShows')
              .flyTo({
                center: [-77.38, 39],
                zoom: 3
            });
        },

		addCurrentShowLayer: function(map, currentShow) {
			map.addSource('currentShow', geoJsonConverter([currentShow]))
              .addLayer({
                id: "currentShow",
                type: "circle",
                source: "currentShow",
                paint: {
                    'circle-radius': 5,
                    'circle-color': 'white'
                }})
              .flyTo({
                center: [currentShow.longitude, currentShow.latitude],
                zoom: 9
            });
		},

        resetCurrentShowLayer: function(map, filteredShows) {
            map.removeSource('currentShow')
              .removeLayer('currentShow')
              .fitBounds(getBounds(filteredShows));
        }



	}

});