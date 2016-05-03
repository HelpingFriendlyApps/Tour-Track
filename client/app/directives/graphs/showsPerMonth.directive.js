'use strict'

app.directive('showsPerMonth', [function() {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="showsPerMonth"></div>',
    scope: {
      allShows: '=',
      userShows: '='
    },
    link: function(scope, element, attrs) {

      scope.$watchGroup(['allShows', 'userShows'], (shows) => {
        console.log('shows', shows)
        if(!shows[0] || !shows[1]) return;

        scope.allShowsPerMonth = parser(shows[0]);
        scope.userShowsPerMonth = parser(shows[1]);
        console.log('scope.allShowsPerMonth', scope.allShowsPerMonth)
        console.log('scope.userShowsPerMonth', scope.userShowsPerMonth)

      }, true);

      function parser(shows) {
        var showsPerMonth = [];

        var MonthObj = function(year, month) {
          this.year = year;
          this.month = month;
          this.count = 0;
        }

        var prevYear, prevMonth, monthObj;

        shows.forEach( (show, i) => {
          if(show.showdate) show.showdate += 'T05:00:00.000Z';
          var currYear = new Date(show.date || show.showdate).getFullYear(),
            currMonth = new Date(show.date || show.showdate).getMonth() + 1;

          if(currYear !== prevYear || currMonth !== prevMonth) {
            prevYear = prevYear || currYear;
            prevMonth = prevMonth || currMonth;
            if(monthObj) showsPerMonth.push(monthObj);

            while(prevYear <= currYear) {
              while(++prevMonth <= 12) {
                if(prevMonth === currMonth && prevYear === currYear) break;
                if(showsPerMonth.length) showsPerMonth.push(new MonthObj(prevYear, prevMonth));
              }
              prevMonth = 0;
              prevYear++;
            }

            monthObj = new MonthObj(currYear, currMonth);
          }

          monthObj.count++;
          prevYear = currYear;
          prevMonth = currMonth;
          if(i === shows.length-1) showsPerMonth.push(monthObj);
        });

        return showsPerMonth;
      }





















      // scope.allShowsPerMonth = [];

      // scope.$watch('allShows', function(allShows) {
      //   console.log('allShows', allShows)

      //   scope.allShowsPerMonth = [];
      //   var prevYear;
      //   var prevMonth;

      //   var MonthObj = function(year, month) {
      //     this.year = year;
      //     this.month = month;
      //     this.count = 0;
      //   }

      //   var monthObj;

      //   allShows.slice(0,20).forEach(function(show) {
      //     var year = new Date(show.date).getFullYear();
      //     var month = new Date(show.date).getMonth() + 1;

      //     if(year !== prevYear || month !== prevMonth) {
      //       prevYear = prevYear || year;
      //       prevMonth = prevMonth || month;
      //       scope.allShowsPerMonth.push(monthObj);

      //       while(prevYear <= year) {
      //         while(prevMonth !== month && prevMonth <= 12) {
      //           console.log('inside while')
      //           scope.allShowsPerMonth.push(new MonthObj(prevYear, prevMonth));
      //           console.log('INSIDE WHILE scope.allShowsPerMonth', scope.allShowsPerMonth)
      //           // prevMonth = prevMonth === 11 ? prevMonth++ : 0;
      //           // ++prevMonth % 12;
      //           prevMonth = (prevMonth % 12) + 1;
      //         }
      //         prevYear++;
      //       }

      //       monthObj = new MonthObj(year, month);

      //       prevYear = year;
      //       prevMonth = month;
      //     }
      //     monthObj.count++;
      //   });
      //   console.log('scope.allShowsPerMonth', scope.allShowsPerMonth)

      // }, true);

    }
  };
}]);