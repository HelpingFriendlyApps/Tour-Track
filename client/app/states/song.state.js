'use strict'

angular.module('Tour-Track').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('mapLeft.song', {
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