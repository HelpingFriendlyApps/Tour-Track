'use strict';

angular.module('Tour-Track')
  .factory('SVY', function($http, $sce) {

    return {
        arrCreator : function(shows) {
        var showsVsYear = [];

        shows.forEach(function(show) {
            var yearFound = false;
            var year = parseInt(show.showdate.slice(0,4));
            for (var i = 0; i < showsVsYear.length; i++) {
                if(showsVsYear[i][0] === year) {
                    yearFound = true;
                    showsVsYear[i][1]++;
                    break;
                }
            }
            if(!yearFound) showsVsYear.push([year, 1]);
        })
        return showsVsYear;
    }
    }
});
