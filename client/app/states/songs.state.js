'use strict'

angular.module('Tour-Track').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('base.songs', {
    url: '/songs',
    templateUrl: '../views/songs.html',
    controller: 'SongsCtrl',
    resolve: {
      allSongs: function(SongFactory) {
        return SongFactory.getAllSongs();
      }
    }
  });

});