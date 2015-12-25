'use strict'

angular.module('Tour-Track').directive('map', function(General, MapFactory) {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngController',
        template: '<div id="map"></div>',
        scope: {
            shows: '=',
            progress: '=',
            currentShow: '=',
            filteredShows: '='
        },
        link: function(scope, element, attrs) {

            mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/luismartins/ciijx4rg4004z1mmbunfmzml2',
                center: [-77.38, 39],
                zoom: 3
            });

            map.on('style.load', function() {
                if(scope.shows) MapFactory.addShowsLayer(map, scope.shows);
            });
            
            scope.$watch('shows', function(shows) {
                if(shows) MapFactory.addShowsLayer(map, shows);
            }, true);


            map.on('click', function(e) {
                map.featuresAt(e.point, {layer: 'shows', radius: 15, includeGeometry: true}, function(err, features) {
                    if(err) throw err;
                    if(features.length) {
                        map.flyTo({center: features[0].geometry.coordinates});
                        var thing = General.getShowWithVenueInfoById(features[0].properties.show_id);
                        console.log('thing', thing)
                    }
                });
            });

            map.on('mousemove', function(e) {
                map.featuresAt(e.point, {layer: 'shows', radius: 15}, function(err, features) {
                    if(err) throw err;
                    map.getCanvas().style.cursor = features.length ? 'pointer' : '';
                });
            });

            
            scope.$watch('filteredShows', function(filteredShows) {
                if(filteredShows) MapFactory.addFilteredShowsLayer(map, filteredShows);
                if(filteredShows === null) MapFactory.resetFilteredShowsLayer(map);
            }, true);

            scope.$watch('currentShow', function(currentShow) {
                if(currentShow) MapFactory.addCurrentShowLayer(map, currentShow);
                if(currentShow === null) MapFactory.resetCurrentShowLayer(map, scope.filteredShows)
            }, true);


        }
    };
});