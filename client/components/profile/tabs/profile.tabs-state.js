angular.module('Tour-Track')

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('profile.tabs', {
        url: '/tabs',
        templateUrl: 'components/profile/tabs/profile.tabs.html',
        controller: 'TabsCtrl'
    })
});