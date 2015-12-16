angular.module('Tour-Track').directive('progressMap', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="map"></div>',
        scope: {
            data: '='
        },
        link: function(scope, element, attrs) {

            L.mapbox.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
            var map = L.mapbox.map('map', 'mapbox.satellite')
            	.setView([0,0],1);

            var earthquakesLayer = L.geoJson(null, { pointToLayer: scaledPoint })
                .addTo(map);

            function pointRadius(feature) {
                return (feature.properties.mag - 4) * 10;
            }

            function scaledPoint(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: pointRadius(feature),
                    fillColor: pointColor(feature),
                    fillOpacity: 0.7,
                    weight: 0.5,
                    color: '#fff'
                }).bindPopup(
                '<h2>' + feature.properties.place + '</h2>' + 
                '<h3>' + new Date(feature.properties.time) + '</h3>' +
                feature.properties.mag + ' magnitude');
            }

            scope.$watch('data', function(shows) {
                if(shows) {
                    console.log('shows', shows)
                }
            })

        }
    };
});