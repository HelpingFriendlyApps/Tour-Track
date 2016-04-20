'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', 'VenueFactory', '$timeout', function($scope, allShows, ShowFactory, VenueFactory, $timeout) {

  var years = [];

  var Shows = function() {
    this.loadedPages = {};
    this.numItems = 0;
    this.pageSize = 50;
    this.fetchNumItems();
  };

  Shows.prototype.getItemAtIndex = function(index) {
    var pageNumber = Math.floor(index / this.pageSize);
    var page = this.loadedPages[pageNumber];

    if(page) return page[index % this.pageSize];
    else this.fetchPage(pageNumber);
  };

  Shows.prototype.getLength = function() {
    return this.numItems;
  };

  Shows.prototype.fetchPage = function(pageNumber) {
    var self = this.loadedPages[pageNumber] = [];
    var showChunk = allShows.slice(pageNumber * this.pageSize, ++pageNumber * this.pageSize);

    showChunk.forEach(function(show) {
      var year = show.date.slice(0,4);
      if(years.indexOf(year) < 0) {
        show.firstOfYear = true;
        years.push(year);
      }
      self.push(show);
    });
  };

  Shows.prototype.fetchNumItems = function() {
    $timeout(angular.noop, 300).then(angular.bind(this, function() {
      this.numItems = 50000;
    }));
  };

  $scope.shows = new Shows();
  console.log('$scope.shows', $scope.shows)

}]);