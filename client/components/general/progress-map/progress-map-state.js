angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('general.progressmap', {
        url: '/progressmap',
        templateUrl: 'components/general/progress-map/progress-map.html',
        controller: 'ProgressMapCtrl'
        
    });
});