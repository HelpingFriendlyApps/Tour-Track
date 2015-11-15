angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('general.map', {
		url: '/map',
        templateUrl: 'components/general/map/general.map.html',
        controller: 'GeneralMapCtrl'
    });

});