angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('profile.showsvsstatemap', {
		url: '/showsvsstatemap',
        templateUrl: 'components/profile/showsvsstatemap/profile.showsvsstatemap.html',
        controller: 'ProfileShowsVsStateMapCtrl'
        
	});
});