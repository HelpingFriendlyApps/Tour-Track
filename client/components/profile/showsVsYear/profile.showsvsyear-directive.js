angular.module('Tour-Track').directive('profileshowsvsyear', function($parse) {
	return {
		restrict: 'E',
		replace: true,
		template: '<div id="randomId"></div>',
		controller: 'ProfileShowsVsYearCtrl',
		scope: {
			showVsYears: '='
		},
		link: function(scope, element, attrs) {

			//Width and height
			var w = 100;
			var h = 250;
			var barPadding = 1;
			
			// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
			// 				11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			// var dataset = {
			// 	2009: 5,
			// 	2010: 10,
			// 	2011: 15,
			// 	2012: 20,
			// 	2013: 25,
			// 	2014: 30,
			// 	2015: 35
			// }

			// var dataset = [
			// 	[2009,2],
			// 	[2010,4],
			// 	[2011,6],
			// 	[2012,8],
			// 	[2013,10],
			// 	[2014,12],
			// 	[2015,14]
			// ]

			// var datasetLength = Object.keys(dataset).length;

			var dataset = scope.showVsYears;
			console.log("dataset", dataset)
			// var dataset = scope.testArr;
			
			//Create SVG element
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

			// ORIGINAL
			// //Create SVG element
			// var svg = d3.select("#randomId")
			// 	.append("svg")
			// 	.attr("width", w)
			// 	.attr("height", h);

			// svg.selectAll("rect")
			//    .data(dataset)
			//    .enter()
			//    .append("rect")
			//    .attr("x", function(d, i) {
			//    		return i * (w / dataset.length);
			//    })
			//    .attr("y", function (d) {
			//    		return h - (d * 4);
			//    })
			//    .attr("width", w / dataset.length - barPadding)
			//    .attr("height", function (d) {
			// 	   	return d * 4;
			//    });

			// svg.selectAll("text")
			//    .data(dataset)
			//    .enter()
			//    .append("text")
			//    .text(function(d) {
			//    		return d;
			//    })
			//    .attr("text-anchor", "middle")
			//    .attr("x", function(d, i) {
			//    		return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
			//    })
			//    .attr("y", function(d) {
			//    		return h - (d * 4) + 14;
			//    })
			//    .attr("font-family", "sans-serif")
			//    .attr("font-size", "11px")
			//    .attr("fill", "white");
			
		}
	};
});