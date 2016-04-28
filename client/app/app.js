'use strict';

var app = angular.module('Tour-Track', [
  'ui.router',
  'ngSanitize',
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'duScroll',
  'ngStorage'
])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    // $stateProvider.state('base', {
    //   abstract: true,
    //   // template: '<navbar id="navbar"></navbar><ui-view></ui-view>'
    //   template: '<ui-view></ui-view>'
    // });

    // $locationProvider.html5Mode(true);

     
});
