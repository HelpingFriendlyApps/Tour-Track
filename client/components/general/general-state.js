angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('general', {
		url: '/general',
        templateUrl: 'components/general/general.html',
        controller: 'GeneralCtrl'
    });

});