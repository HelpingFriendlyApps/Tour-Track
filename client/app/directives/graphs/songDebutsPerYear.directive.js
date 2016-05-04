'use strict'

app.directive('songDebutsPerYear', ["$q", "SongFactory", function($q, SongFactory) {
  return {
    replace: true,
    restrict: 'E',
    template: '<div id="songDebutsPerYear"></div>',
    scope: {
      setlist: '='
    },
    link: function(scope, element, attrs) {

      scope.$watch('setlist', (setlist) => {
        console.log('setlist', setlist)
        
        var firstYear = 1983;
        var years = Array.apply(null, {length: new Date().getFullYear() - firstYear}).map( () => {
          return firstYear++;
        });

        $q.all(setlist.map( (song) => {
          var deffered = $q.defer();
          SongFactory.getSongDebut(song.song_id).then( (debut) => {
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

          console.log('debutsPerYear', debutsPerYear)
          
          var chart = c3.generate({
            bindto: '#songDebutsPerYear',
            data: {
              columns: [
                ['debuts', ...debutsPerYear.map( (year) => { return year.debuts; })]
              ],
              type: 'bar'
            },
            bar: {
              width: {
                ratio: 0.5
              }
            },
            axis: {
              y: {
                show: false
              }
            }
          });

        });

      });


    }
  };
}]);