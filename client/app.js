'use strict';

angular.module('Tour-Track', [
    'ui.router',
    'ngSanitize'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        })

        .state('profile', {
          url: '/profile',
          templateUrl: 'profile/profile.html',
          controller: 'ProfileCtrl'
        })

        .state('testing', {
          url: '/testing',
          templateUrl: 'testing/testing.html',
          controller: 'TestingCtrl'
        });
        
});
