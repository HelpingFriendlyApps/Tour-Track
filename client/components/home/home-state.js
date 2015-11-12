angular.module('Tour-Track').config(function($stateProvider) {

	$stateProvider.state('home', {
		url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl'

	});
});