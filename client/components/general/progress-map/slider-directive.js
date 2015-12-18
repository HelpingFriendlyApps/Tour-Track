angular.module('Tour-Track').directive('progressSlider', function($parse) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="slider"></div>',
        scope: {
            shows: '='
        },
        link: function(scope, element, attrs) {



        }
    };
});