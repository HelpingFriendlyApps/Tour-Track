angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {


	$stateProvider.state('profile', {
		url: '/profile',
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl'
    });
});

