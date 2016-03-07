'use strict';

angular.module('Tour-Track', [
    'ui.router',
    'ngSanitize'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
     
});
