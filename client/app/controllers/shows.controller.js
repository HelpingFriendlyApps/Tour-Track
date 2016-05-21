'use strict';

angular.module('Tour-Track')
.controller('ShowsCtrl', ['$scope', 'allShows', 'ShowFactory', '$timeout', function($scope, allShows, ShowFactory, $timeout) {

  $scope.allShows = allShows;

  var years = [];
  $scope.showsFilter = { year: "", date: "", venue: "", location: "" };
  
  ShowFactory.getAllShowYears().then( (showYears) => {
    $scope.showYears = showYears;
  });

  $scope.$watch('showsFilter', (showsFilter) => {
    years = [];
    var dateString = showsFilter.date ? showsFilter.date.toISOString().slice(0,10) : ""

    $scope.filteredShows = allShows.filter( (show) => {
      return show.date.slice(0,4).indexOf(showsFilter.year) > -1
        && show.date.slice(0,10).indexOf(dateString) > -1 
        && show.location.toLowerCase().indexOf(showsFilter.location.toLowerCase()) > -1 
        && show.venue_name.toLowerCase().indexOf(showsFilter.venue.toLowerCase()) > -1;
    });

    $scope.shows = new Shows($scope.filteredShows);
  }, true);


  var Shows = function(showCollection) {
    this.loadedPages = {};
    this.numItems = 0;
    this.pageSize = (showCollection.length < 50) ? showCollection.length : 50;
    this.showCollection = showCollection;
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
    var showChunk = this.showCollection.slice(pageNumber * this.pageSize, ++pageNumber * this.pageSize);

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
      this.numItems = this.showCollection.length;
    }));
  };

}]);