angular.module('Tour-Track').directive('progressMap', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngController',
        template: '<div id="map"></div>',
        scope: {
            shows: '=',
            progress: '='
        },
        link: function(scope, element, attrs) {

            L.mapbox.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
            var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([37.9, -77],4);

            var showsLayer = L.geoJson(null, { pointToLayer: scaledPoint })
                .addTo(map);

            var radius = 50;
            function scaledPoint(feature, latlng) {
                return L.circle(latlng, radius);
            }

            scope.$watch('shows', function(shows) {
                if(shows) {

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

                    scope.$watch('progress', function(progress) {
                        var progShows = Object.assign({}, geoJsonData)
                        progShows.features = progShows.features.slice(0, progress);

                        showsLayer.clearLayers()
                            .addData(progShows);

                    }, true);


                }
            }, true);

            // map.on('zoomend', function() {
            //     console.log('map.getZoom()', map.getZoom())
            // })

        }
    };
});