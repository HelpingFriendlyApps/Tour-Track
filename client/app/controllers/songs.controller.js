'use strict';

angular.module('Tour-Track')
.controller('SongsCtrl', ['$scope', 'allSongs', '$timeout', function($scope, allSongs, $timeout) {

  $scope.$watch('songFilter', (filter) => {
    filter = filter || "";
    var filteredSongs = allSongs.filter( (song) => {
      return song.title.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
    $scope.songs = new Songs(filteredSongs);
  });


  var Songs = function(songCollection) {
    this.loadedPages = {};
    this.numItems = 0;
    this.pageSize = (songCollection.length < 50) ? songCollection.length : 50;
    this.songCollection = songCollection;
    this.fetchNumItems();
  };

  Songs.prototype.getItemAtIndex = function(index) {
    var pageNumber = Math.floor(index / this.pageSize);
    var page = this.loadedPages[pageNumber];

    if(page) return page[index % this.pageSize];
    else this.fetchPage(pageNumber);
  };

  Songs.prototype.getLength = function() {
    return this.numItems;
  };

  Songs.prototype.fetchPage = function(pageNumber) {
    var self = this.loadedPages[pageNumber] = [];
    var songChunk = this.songCollection.slice(pageNumber * this.pageSize, ++pageNumber * this.pageSize);
    self.push(...songChunk);
  };

  Songs.prototype.fetchNumItems = function() {
    this.numItems = this.songCollection.length;
  };

}]);