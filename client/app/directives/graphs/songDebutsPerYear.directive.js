'use strict'

app.directive('songDebutsPerYear', ["$q", "TrackFactory", function($q, TrackFactory) {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="songDebutsPerYear"></div>',
    scope: {
      setlist: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('setlist', (setlist) => {
        
        var firstYear = 1983;
        var years = Array.apply(null, {length: new Date().getFullYear() - firstYear}).map( () => {
          return firstYear++;
        });

        $q.all(setlist.map( (song) => {
          var deffered = $q.defer();
          TrackFactory.getSongDebut(song.song_id).then( (debut) => {
            deffered.resolve(debut);
          });
          return deffered.promise;
        })).then( (debuts) => {
          setlist.forEach( (song, i) => {
            song.debut = debuts[i].date;
          });
          
          var debutsPerYear = years.map( (year, yearsIdx) => {
            var debuts = 0;
            setlist.forEach( (song, setlistIdx) => {
              if(parseInt(song.debut.slice(0,4)) === year) debuts++;
            });
            return { year: year, debuts: debuts };
          });

          var chart = c3.generate({
            bindto: '#songDebutsPerYear',
            size: {
              height: 80
            },
            data: {
              columns: [
                ['Song Debut Years', ...debutsPerYear.map( (year) => { return year.debuts; })]
              ],
              colors: {
                'Song Debut Years': '#F25F5C'
              },
              type: 'bar'
            },
            bar: {
              width: {
                ratio: 0.75
              }
            },
            axis: {
              x: {
                type: 'category',
                categories: years,
                tick: {
                  multiline: false,
                  culling: true
                }
              },
              y: {
                show: false
              }
            },
            legend: {
              position: 'inset',
              inset: {
                anchor: 'top-right',
                x: 20,
                y: 10
              }
            },
            tooltip: {
              format: {
                name: function(name, ratio, id, index) {
                  return 'Songs';
                }
              }
            }
          });

        });

      });

    }
  };
}]);