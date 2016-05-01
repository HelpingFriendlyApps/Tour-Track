'use strict'

app.directive('songLengthsPerYear', ["$q", "ShowFactory", function($q, ShowFactory) {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="splineGraph"></div>',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('data', (data) => {
        if(!data) return;
        var lengthTypes = ['longestLength', 'avg', 'shortestLength'],
          legendTypes = ['Longest', 'Average', 'Shortest'],
          years = [],
          showIds = {longest: [], shortest: []},
          shows = {longest: [], shortest: []};

        var columns = lengthTypes.map( (type, i) => {
          var col = [legendTypes[i]];
          data.some( (yearObj, i) => {
            if(!yearObj.avg) return;
            if(i >= years.length) {
              years.push(yearObj.year);
              showIds.longest.push(yearObj.longestShowId);
              showIds.shortest.push(yearObj.shortestShowId);
            }
            col.push(yearObj[type] || 0)
          });
          return col;
        });

        ['longest', 'shortest'].forEach( (key) => {
          $q.all(showIds[key].map( (showId) => {
            var deffered = $q.defer();
            ShowFactory.getShowById(showId).then( (show) => {
              deffered.resolve(show);
            });
            return deffered.promise;
          })).then( (all) => {
            shows[key] = all;
          });
        });

        var chart = c3.generate({
          bindto: '#splineGraph',
          data: {
            columns: columns,
            type: 'spline',
            colors: {
              Longest: '#475F77',
              Average: '#D74B4B',
              Shortest: '#158A36'
            }
          },
          axis: {
            x: {
              type: 'category',
              categories: years
            },
            y: {
              tick: {
                format: (y) => {
                  var min = Math.floor(y / 60000);
                  var sec = Math.floor(y / 1000 % 60);
                  sec = sec < 10 ? '0' + sec : sec;
                  return min + ':' + sec;
                }
              }
            }
          },
          tooltip: {
            format: {
              name: function(name, ratio, id, index) {
                if(['Longest', 'Shortest'].indexOf(name) > -1) {
                  var date = (shows[name.toLowerCase()][index].date).slice(5,10).replace('-','/');
                  if(date[0] === '0') date = date.slice(1, date.length);
                  return date;
                }
                else return 'Average';
              }
            }
          }
        });


      }, true);

    }
  };
}]);