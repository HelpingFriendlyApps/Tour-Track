'use strict';

angular.module('Tour-Track')
.factory('PlayerFactory', function($rootScope) {

  var PlayerFactory = {};

  $rootScope.player = {};

  PlayerFactory.play = function(song, showSongsList) {
    console.log('argument', arguments)
    $rootScope.player.song = song;
    if(showSongsList) $rootScope.player.showSongsList = showSongsList;
  }

  PlayerFactory.upNext = function(song) {
    console.log('song', song)
    $rootScope.player.upNext = song;
  }

  PlayerFactory.addToUpNext = function(song) {
    console.log('song', song)
    $rootScope.player.addToUpNext = song;
  }

  return PlayerFactory;

});