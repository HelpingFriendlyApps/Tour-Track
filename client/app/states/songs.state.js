'use strict'

angular.module('Tour-Track').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('mapLeft.songs', {
    url: '/songs',
    templateUrl: '../views/songs.html',
    controller: 'SongsCtrl',
    resolve: {
      allSongs: function(SongFactory) {
        return SongFactory.getAllSongs();
      }
    }
  });

}]);