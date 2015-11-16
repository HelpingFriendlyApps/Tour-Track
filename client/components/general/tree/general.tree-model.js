'use strict';

angular.module('Tour-Track')
.factory('GeneralLayoutTreeFactory', function () {
	
	return {

		treeObjCreator: function (scopeYears, scopeTours, scopeShows, scopeSongs) {
			
			function Node (name, children) {
				this.name = name;
				this.children = children || [];
			}

			function SongNode (name) {
				this.name = name;
				this.size = 1000;
			}

			var phishObj = new Node ("Phish");

			scopeYears.forEach(function(year) {
				var yearsTours = scopeTours.filter(function(tour) {
					var tourYear = tour.starts_on.slice(0,4);
					return tourYear === year;
				})

				var tourArr = [];
				yearsTours.forEach(function(tour) {

					var tourShows = scopeShows.filter(function(show) {
						return show.tour_id === tour.id;
					})

					var showArr = [];
					tourShows.forEach(function(show) {
						var showDate = show.date.slice(0,10);
						var showName = showDate + " " + show.location;
						
						var showSongs = scopeSongs.filter(function(song) {
							var songDate = song.date.slice(0,10);
							return songDate === showDate;
						})

						var songArr = [];
						showSongs.forEach(function(song) {
							var songNode = new SongNode (song.title)
							if(songNode) songArr.push(songNode);
						})

						var showNode = new Node (showName, songArr);
						if(showNode) {
							showArr.push(showNode);
							showArr.sort(function(a, b) {
								var aNumber = Number(a.name.slice(0,4)+a.name.slice(5,7)+a.name.slice(8,10));
						        var bNumber = Number(b.name.slice(0,4)+b.name.slice(5,7)+b.name.slice(8,10));
								return aNumber - bNumber;
							})
						}
					})

					var tourNode = new Node (tour.name, showArr);
					if(tourNode) tourArr.push(tourNode);
				})

				phishObj.children.push(new Node (year, tourArr));


			});

			console.log("phishObj", phishObj);
			return phishObj;

		}
	}
});