angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('profile.showsperstate', {
        url: '/showsperstate',
        templateUrl: 'components/profile/showsPerState/profile.showsperstate.html',
        controller: 'ProfileShowsPerState'
        
    });
});