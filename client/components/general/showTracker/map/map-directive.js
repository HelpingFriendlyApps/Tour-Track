angular.module('Tour-Track').directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        require: '^ngController',
        template: '<div id="map"></div>',
        scope: {
            shows: '=',
            progress: '=',
            currentShow: '='
        },
        link: function(scope, element, attrs) {

            mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc21hcnRpbnMiLCJhIjoiY2loZ2xsNnpwMG0xcnZia2x2Mnp3ZzYzMCJ9.huypgaYnUDo8wKLThRmyVQ';
            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/luismartins/ciijdjlxr003hzwma0fhnlxfm', //hosted style id
                center: [-77.38, 39], // starting position
                zoom: 3 // starting zoom
            });

        }
    };
});