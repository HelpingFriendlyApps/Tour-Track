angular.module('Tour-Track').config(function($stateProvider) {

	$stateProvider.state('home', {
		url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'

	});
});