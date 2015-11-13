angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('profile.showsvsyear', {
		url: '/showsvsyear',
        templateUrl: 'components/profile/showsvsyear/profile.showsvsyear.html',
        controller: 'ProfileShowsVsYearCtrl'
        
	});
});