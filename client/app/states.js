'use strict';

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: '../views/home.html',
    controller: 'HomeCtrl'
  })

  .state('shows', {
    url: '/shows',
    templateUrl: '../views/shows.html',
    controller: 'ShowsCtrl',
    resolve: {
      allShows: function(ShowFactory) {
        return ShowFactory.getAllShows();
      }
    }
  })

  .state('show', {
    url: '/show/:date',
    templateUrl: '../views/show.html',
    controller: 'ShowCtrl',
    resolve: {
      show: function(ShowFactory, $stateParams) {
        return ShowFactory.getShowByDate($stateParams.date);
      },
      setlist: function(ShowFactory, $stateParams) {
        return ShowFactory.getSetlistByDate($stateParams.date);
      }
    }
  })

  .state('songs', {
    url: '/songs',
    templateUrl: '../views/songs.html',
    controller: 'SongsCtrl',
    resolve: {
      allSongs: function(SongFactory) {
        return SongFactory.getAllSongs();
      }
    }
  })

  .state('song', {
    url: '/song/:songId',
    templateUrl: '../views/song.html',
    controller: 'SongCtrl',
    resolve: {
      song: function(SongFactory, $stateParams) {
        return SongFactory.getSongById($stateParams.songId);
      }
    }
  });
   
}]);