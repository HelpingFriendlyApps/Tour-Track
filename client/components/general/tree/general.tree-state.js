angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('general.layouttree', {
        url: '/layouttree',
        templateUrl: 'components/general/tree/general.tree.html',
        controller: 'GeneralLayoutTree'
        
    });
});