'use strict';

angular.module('Tour-Track', [
    'ui.router',
    'ngSanitize',
    'ngMaterial'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
     
});
