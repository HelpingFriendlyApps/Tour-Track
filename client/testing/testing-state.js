angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('testing', {
		url: '/testing',
        templateUrl: 'testing/testing.html',
        controller: 'TestingCtrl'

	});
});