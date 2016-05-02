'use strict';

angular.module('Tour-Track')
.controller('SongsCtrl', ['$scope', 'allSongs', '$timeout', function($scope, allSongs, $timeout) {

  // $scope.songs = allSongs;

  console.log('allSongs', allSongs)




  var Songs = function(songCollection) {
    this.loadedPages = {};
    this.numItems = 0;
    // this.pageSize = 50;
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
    console.log('songChunk', songChunk)
    self.push(...songChunk);
  };

  Songs.prototype.fetchNumItems = function() {
    $timeout(angular.noop, 300).then(angular.bind(this, function() {
      this.numItems = this.songCollection.length;
      console.log('this.numItems', this.numItems)
    }));
  };

  $scope.songs = new Songs(allSongs);

}]);