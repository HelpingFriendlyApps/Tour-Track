angular.module('Tour-Track').directive('profileshowsvsyear', function($parse) {
	return {
		restrict: 'E',
		replace: true,
		template: '<div id="randomId"></div>',
		controller: 'ProfileShowsVsYearCtrl',
		scope: {
			data: '='
		},
		link: function(scope, element, attrs) {
			
			//Width and height
			var w = 100;
			var h = 250;
			var barPadding = 1;


			scope.$watch('data', function(newData, oldData) {
				dataset = newData;
			
			// Create SVG element
			if(dataset) {
				var svg = d3.select("#randomId")
					.append("svg")
					.attr("width", w + "%")
					.attr("height", h);

				svg.selectAll("rect")
				   .data(dataset)
				   .enter()
				   .append("rect")
				   .attr("x", function(d, i) {
				   		return (i * (w / dataset.length)) + "%";
				   })
				   .attr("y", function (d) {
				   		return h - (d[1] * 15);
				   })
				   .attr("width", (w / dataset.length - barPadding) + "%")
				   .attr("height", function (d) {
					   	return d[1] * 15;
				   });

				svg.selectAll("text")
				   .data(dataset)
				   .enter()
				   .append("text")
				   .text(function(d) {
				   		return d[0];
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
				   		return (i * (w / dataset.length) + (w / dataset.length - barPadding) / 2) + "%";
				   })
				   .attr("y", function(d) {
				   		return h - (d[1] * 15) + 14;
				   })
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "11px")
				   .attr("fill", "white");
				}
        	}, true);
			
		}
	};
});