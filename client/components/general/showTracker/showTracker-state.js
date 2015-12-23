angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('general.showtracker', {
        url: '/showtracker',
        templateUrl: 'components/general/showTracker/showTracker.html',
        controller: 'ShowTrackerCtrl'
        
    });
});