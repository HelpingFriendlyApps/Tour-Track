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
  'angularMoment'
])
  
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('shows', {
      url: '/shows',
      templateUrl: '../app/components/shows/shows.html',
      controller: 'ShowsCtrl',
      resolve: {
        allShows: function(ShowFactory) {
          return ShowFactory.getAllShows();
        }
      }
    }).state('show', {
      url: '/show/:date',
      templateUrl: '../app/components/show/show.html',
      controller: 'ShowCtrl',
      resolve: {
        show: function(ShowFactory, $stateParams) {
          return ShowFactory.getShowByDate($stateParams.date);
        },

        setlist: function(ShowFactory, $stateParams) {
          return ShowFactory.getSetlistByDate($stateParams.date);
        }
      }
    }).state('songs', {
      url: '/songs',
      templateUrl: '../app/components/songs/songs.html',
      controller: 'SongsCtrl',
      resolve: {
        allSongs: function(SongFactory) {
          return SongFactory.getAllSongs();
        }
      }
    });
 
}]);