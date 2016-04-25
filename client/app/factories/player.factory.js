'use strict';

angular.module('Tour-Track')
.factory('PlayerFactory', function($rootScope) {

  var PlayerFactory = {};

  PlayerFactory.playSong = function(song) {
    $rootScope.playSong = song;
  }

  PlayerFactory.addToPlaylist = function(song) {
    // $rootScope.playerPlaylist = $rootScope.playerPlaylist || [];
    // $rootScope.playerPlaylist.push(song);
    $rootScope.addToPlaylist = song;
  }

  PlayerFactory.addToUpNext = function(song) {
    // $rootScope.playerPlaylist = $rootScope.playerPlaylist || [];
    // $rootScope.playerPlaylist.unshift(song);
    $rootScope.addToUpNext = song;
  }

  return PlayerFactory;

});