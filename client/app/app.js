'use strict';

var app = angular.module('Tour-Track', [
  'ui.router',
  'ngSanitize',
  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'duScroll',
  'ngStorage',
  'infinite-scroll',
  'angularMoment',
  'ui.bootstrap',
  'angular-inview'
])

.run(function($state, $rootScope) {
  $rootScope.$state = $state;
});