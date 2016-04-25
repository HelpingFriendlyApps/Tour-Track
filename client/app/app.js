'use strict';

var app = angular.module('Tour-Track', [
  'ui.router',
  'ngSanitize',
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'duScroll'
])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('base', {
      abstract: true,
      // template: '<navbar id="navbar"></navbar><ui-view></ui-view><player></player>'
      template: '<navbar id="navbar"></navbar><ui-view></ui-view>'
    });

    // $locationProvider.html5Mode(true);

     
});
