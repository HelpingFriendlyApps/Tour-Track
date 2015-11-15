angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('general.showsperstate', {
        url: '/showsperstate',
        templateUrl: 'components/general/showsPerState/general.showsperstate.html',
        controller: 'GeneralShowsPerState'
        
    });
});