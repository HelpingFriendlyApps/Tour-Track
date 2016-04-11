'use strict';

angular.module('Tour-Track', [
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'ngMessages'
  ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('base', {
      abstract: true,
      template: '<navbar></navbar><ui-view></ui-view>'
    });

    // $locationProvider.html5Mode(true);
     
});
