angular.module('Tour-Track').directive('yearsOrTours', function($parse, General) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../components/general/progressMap/directives/yearsOrTours/yearsOrTours.html',
        link: function(scope, element, attrs) {

        }
    };
});