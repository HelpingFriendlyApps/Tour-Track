angular.module('Tour-Track').directive('tutorial', function($parse) {
	return {
		restrict: 'E',
		replace: true,template: '<div id="tutorialId"></div>',
		link: function(scope, element, attrs) {

			d3.select("body").append("p").text("New paragraph!");

		}
	};
});