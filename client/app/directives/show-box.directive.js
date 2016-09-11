'use strict'

angular.module('Tour-Track').directive('showBox', ['ShowFactory', function(ShowFactory) {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'views/directives/show-box.html',
    scope: {
      show: '='
    },
    link: function(scope, element, attrs) {

      console.log('scope.show', scope.show)

      let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      scope.show.date = new Date(scope.show.date);
      scope.month = monthNames[scope.show.date.getMonth()];


      ShowFactory.getSetlistByShowId(scope.show.id).then(setlist => {
        console.log('setlist', setlist);

        scope.sets = [];
        let set = [];

        setlist.forEach((song, i) => {
          if(set[set.length-1] && set[set.length-1].set !== song.set) {
            scope.sets.push(set);
            set = [];
          }

          set.push(song);

          if(i === setlist.length - 1) scope.sets.push(set);
        });

        console.log('scope.sets', scope.sets)

      });


    }
  };
}]);