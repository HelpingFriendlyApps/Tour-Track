angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('profile', {
		url: '/profile',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
        
	});
});