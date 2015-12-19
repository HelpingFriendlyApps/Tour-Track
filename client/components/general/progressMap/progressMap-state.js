angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('general.progressmap', {
        url: '/progressmap',
        templateUrl: 'components/general/progressMap/progressMap.html',
        controller: 'ProgressMapCtrl'
        
    });
});