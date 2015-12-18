angular.module('Tour-Track').directive('progressMap', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="map"></div>',
        scope: {
            shows: '='
        },
        link: function(scope, element, attrs) {

            L.mapbox.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
            var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([37.9, -77],4);


            var rendered = false;
            scope.$watch('shows', function(shows) {
                if(shows && !rendered) {
                    rendered = true;
                    // console.log('shows', shows)

                    var geoJsonData = {
                        type: "FeatureCollection",
                        features: []
                    };

                    for(var i = 0; i < shows.length; i++) {
                        if(shows[i].latitude && shows[i].longitude) {
                            geoJsonData.features.push({
                                type: 'Feature',
                                properties: {
                                    count: 20
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: [shows[i].longitude, shows[i].latitude]
                                }
                            });
                        }
                    }

                    var radius = 500;

                    var geoJson = L.geoJson(geoJsonData, {
                        pointToLayer: function(feature, latlng) {
                            return L.circle(latlng, radius);
                        }
                    }).addTo(map);




                }
            }, true);

            map.on('zoomend', function() {
                console.log('map.getZoom()', map.getZoom())
            })


        }
    };
});