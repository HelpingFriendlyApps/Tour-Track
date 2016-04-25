'use strict';

angular.module('Tour-Track')
.factory('PlayerFactory', function($rootScope) {

  var PlayerFactory = {};

  PlayerFactory.playSong = function(song) {
    $rootScope.playSong = song;
  }

  PlayerFactory.addToPlaylist = function(song) {
    $rootScope.addToPlaylist = song;
  }

  PlayerFactory.addToUpNext = function(song) {
    $rootScope.addToUpNext = song;
  }

  return PlayerFactory;

});