'use strict';

angular.module('Tour-Track')
.factory('MapFactory', function($http) {
	
    var startingPoint = { center: [-77.38, 39], zoom: 3 };

	// function geoJsonConverter(venues) {
	// 	var geoJson = {
	// 		type: "geojson",
	// 		data: {
	// 			type: "FeatureCollection",
	// 			features: []
 //            }
 //        };
 //        for(var i = 0; i < venues.length; i++) {
 //            geoJson.data.features.push({
 //                type: 'Feature',
 //                properties: {
 //                    venue_id: venues[i].id
 //                },
 //                geometry: {
 //                    type: 'Point',
 //                    coordinates: [venues[i].longitude, venues[i].latitude]
 //                }
 //            });
 //        }
 //        return geoJson;
	// }

    // PROBLEM WITH FOLLOWING: mapbox GL doesn't currently support data-driven styling...
    function geoJsonConverter(shows) {
        var venues = {};
        for(var i = 0; i < shows.length; i++) {
            if(!venues[shows[i].venue_id]) {
                venues[shows[i].venue_id] = {
                    type: 'Feature',
                    properties: {
                        id: shows[i].venue_id,
                        count: 1
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [shows[i].longitude, shows[i].latitude]
                    }
                };
            } else {
                venues[shows[i].venue_id].properties.count++;
            }
        }
        var parsedVenues = Object.keys(venues).map(key => venues[key]);

        var geoJson = {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: parsedVenues
            }
        };
        console.log('geoJson', geoJson)
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

		addVenuesLayer: function(map, shows) {
            map.addSource('venues', geoJsonConverter(shows))
              .addLayer({
                id: "venues",
                interactive: true,
                type: "circle",
                source: "venues",
                paint: {
                    // 'circle-radius': 3,
                    'circle-radius': feature.properties.count,
                    'circle-color': '#962D3E'
                }
            });
        },

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
              .flyTo(startingPoint);
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
                zoom: 13
            });
		},

        resetCurrentShowLayer: function(map, filteredShows) {
            map.removeSource('currentShow')
              .removeLayer('currentShow');
            if(filteredShows) map.fitBounds(getBounds(filteredShows));
            else map.flyTo({ center: [-77.38, 39], zoom: 3 });
        }

	}

});