'use strict'

app.directive('allShowsPerSeason', [function() {
  return {
    restrict: 'E',
    template: '<div id="allShowsPerSeason"></div>',
    scope: {
      allShows: '=',
      filteredShows: '='
    },
    link: function(scope, element, attrs) {

      let chart, timer;

      scope.$watch('allShows', (allShows) => {

        scope.allShowsPerSeason = showsParser(allShows);

        chart = c3.generate({
          bindto: '#allShowsPerSeason',
          size: {
            height: 80
          },
          data: {
            columns: [
              ['all', ...scope.allShowsPerSeason.map( (season) => { return season.count; })]
            ],
            type: 'area-spline',
            colors: {
              'all': '#F25F5C',
              'filtered': '#FFE066'
            }
          },
          axis: {
            x: {
              show: false,
              padding: { left: 0, right: 0 }
            },
            y: {
              show: false,
              padding: { top: 0, bottom: 0 }
            }
          },
          legend: {
            show: false
          },
          point: {
            show: false
          },
          zoom: {
            enabled: true
          }
        });
        
      });


      scope.$watch('filteredShows', (filteredShows) => {
        if(filteredShows.length === scope.allShows.length) {
          chart.load({
            unload: ['filtered']
          });
          return;
        }

        let filteredShowsPerSeason = showsParser(filteredShows, scope.allShows);

        chart.load({
          columns: [
            ['filtered', ...filteredShowsPerSeason.map( (season) => { return season.count; })]
          ]
        });

      });


      let SeasonObj = function(year, season) {
        this.year = year,
        this.season = season,
        this.count = 0,
        this.shows = []
      }

      function showsParser(shows, filler) {
        let showsPerSeason = [], prevSeason, prevYear, seasonObj;

        shows.forEach( (show, i) => {
          let currYear = getYear(show.date);
          let currSeason = getSeason(show.date);

          if(currSeason !== prevSeason || currYear !== prevYear) {
            prevYear = prevYear || currYear;
            prevSeason = prevSeason || currSeason;
            if(seasonObj) showsPerSeason.push(seasonObj);

            while(prevYear <= currYear) {
              let season = prevYear === currYear ? currSeason : 5;
              while(++prevSeason < season) {
                showsPerSeason.push(new SeasonObj(prevYear, prevSeason));
              }
              prevYear++;
              prevSeason = 0;
            }
            seasonObj = new SeasonObj(currYear, currSeason);
          }

          seasonObj.count++;
          seasonObj.shows.push(show);

          prevYear = currYear;
          prevSeason = currSeason;
          if(i === shows.length - 1) showsPerSeason.push(seasonObj);
        });

        if(filler) {
          return [
            ...fillGaps(filler[0].date, shows[0].date),
            ...showsPerSeason,
            ...fillGaps(shows[shows.length-1].date, filler[filler.length-1].date)
          ];
        }
        return showsPerSeason;

      }


      function fillGaps(start, end) {
        let startYear = getYear(start),
          startSeason = getSeason(start),
          endYear = getYear(end),
          endSeason = getSeason(end);

        let filler = [];

        for (let y = startYear; y <= endYear; y++) {
          let season = y === endYear ? endSeason : 5;
          for (let s = startSeason; s < season; s++) {
            filler.push(new SeasonObj(y, s));
          }
        }
        return filler;
      }

      function getSeason(date) {
        return Math.floor(+date.slice(5,7) % 12 / 3) + 1;
      }

      function getYear(date) {
        let year = +date.slice(0,4);
        if(+date.slice(5,7) === 12) year++;
        return year;
      }


    }

  };
}]);