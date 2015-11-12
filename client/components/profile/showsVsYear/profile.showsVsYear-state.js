angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('profile.showsvsyear', {
		url: '/profile/showsvsyear',
        templateUrl: 'components/profile/showsvsyear/showsvsyear.html',
        controller: 'ProfileCtrl'
        
	});
});