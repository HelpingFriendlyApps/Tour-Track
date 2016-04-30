'use strict';

angular.module('Tour-Track')
.factory('PlayerFactory', ["$rootScope", function($rootScope) {

  var PlayerFactory = {};

  $rootScope.player = {};

  PlayerFactory.play = function(song, showSongsList) {
    $rootScope.player.song = song;
    if(showSongsList) $rootScope.player.showSongsList = showSongsList;
  }

  PlayerFactory.upNext = function(song) {
    $rootScope.player.upNext = song;
  }

  PlayerFactory.addToUpNext = function(song) {
    $rootScope.player.addToUpNext = song;
  }

  return PlayerFactory;

}]);