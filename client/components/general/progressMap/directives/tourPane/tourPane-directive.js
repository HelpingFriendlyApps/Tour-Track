angular.module('Tour-Track').directive('tourPane', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/tourPane/tourPane.html',
        link: function(scope, element, attrs) {

            scope.tours = General.allTours();

            console.log('scope.tours', scope.tours)

        }
    };
});