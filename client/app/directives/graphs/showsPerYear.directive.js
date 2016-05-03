'use strict'

app.directive('showsPerYear', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="showsPerYear"></div>',
    scope: {
      allShows: '=',
      userShows: '='
    },
    link: function(scope, element, attrs) {

      scope.$watchGroup(['allShows', 'userShows'], (shows) => {
        if(!shows[0] || !shows[1]) return;

        var allShowsPerYear = parser(shows[0]);
        var userShowsPerYear = parser(shows[1]);
        
        var firstYear = allShowsPerYear[0].year;
        var firstUserYear = userShowsPerYear[0].year;

        var yearDiff = Array.apply(null, {length: firstUserYear - firstYear}).map( () => { return 0; })

        var chart = c3.generate({
          bindto: '#showsPerYear',
          data: {
            columns: [
              ['all'].concat(allShowsPerYear.map( (year) => { return year.count; })),
              ['user'].concat(yearDiff).concat(userShowsPerYear.map( (year) => { return year.count; }))
            ],
            type: 'area-spline'
          }
        });

      }, true);


      function parser(shows) {
        var showsPerYear = [], prevYear, yearObj;

        var YearObj = function(year) {
          this.year = year,
          this.count = 0
        }

        shows.forEach( (show, i) => {
          if(show.showdate) show.showdate += 'T05:00:00.000Z';
          var currYear = new Date(show.date || show.showdate).getFullYear();

          if(currYear !== prevYear) {
            prevYear = prevYear || currYear;
            if(yearObj) showsPerYear.push(yearObj);

            while(++prevYear < currYear) {
              showsPerYear.push(new YearObj(prevYear));
            }
            yearObj = new YearObj(currYear);
          }
          
          yearObj.count++;
          prevYear = currYear;
          if(i === shows.length - 1) showsPerYear.push(yearObj);
        });

        return showsPerYear;
      }

    }
  };
}]);