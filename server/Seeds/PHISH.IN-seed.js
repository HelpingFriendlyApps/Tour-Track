var ph = require('../models/Phish').Phishin();
var Tours = require('../models/Tours');
var Shows = require('../models/Shows');
var Songs = require('../models/Songs');
var Venues = require('../models/Venues');
var Tracks = require('../models/Tracks');
var Promise = require('bluebird');


function seedSongs(){
    ph.getSongs(null, ['per_page=2000']).then(function(x){
        var data = JSON.parse(x).data;
        return data.map( (song) => {
            var songModel = {
                id: song.id,
                title: song.title,
                created_at: new Date()
            }
            Songs.updateOrCreate(songModel);
        })
    });
}
function seedTours(){
    ph.getTours(null, ['per_page=1000']).then(function(x){
        var data = JSON.parse(x).data;
        data.map( (tour) => {
            var tourModel = {
                    name: tour.name,
                    id: tour.id,
                    starts_on: tour.starts_on,
                    ends_on: tour.ends_on,
                    created_at: new Date()
                }
            Tours.updateOrCreate(tourModel);
        })
    })
}

function seedVenues(){
    ph.getVenues(null, ['per_page=3000']).then(function(x){
        var data = JSON.parse(x).data;
        data.map( (venue) => {
            var venueModel = {
                    location: venue.location,
                    id: venue.id,
                    longitude: venue.longitude,
                    latitude:  venue.latitude,
                    name: venue.name,
                    created_at: new Date()
                }
            Venues.updateOrCreate(venueModel);
        })
    })
}

function seedShows(){
    ph.getShows(null, ['per_page=3000']).then(function(x){
        var data = JSON.parse(x).data;
        data.map( (show) => {
            var showModel = {
                    date: show.date,
                    id: show.id,
                    tour_id: show.tour_id,
                    venue_id:  show.venue_id,
                    duration: show.duration,
                    created_at: new Date()
                }
            Shows.updateOrCreate(showModel);
        })
    })
}
seedSongs();
seedTours();
seedVenues();
seedShows();
//Possibly add, currently overloads the API service 
// function seedPlayedSongs(){
//     for(var i = 0; i < 1000; i++){
//         ph.getTracks(i).then(function(x){
//             var track = JSON.parse(x).data;
//             var playedSongsModel = {
//                 position: track.position,
//                 duration: track.duration,
//                 id: track.id,
//                 show_id: track.show_id,
//                 set: track.set,
//                 created_at: new Date()
//             }
//             if(track.song_ids.length === 1){
//                 playedSongsModel.song_id =  track.song_ids[0];
//             } else {
//                 track.song_ids.forEach( (song_id, i) => {
//                     console.log(i);
//                     var num = (1 + i).toString();
//                     playedSongsModel[song_id + num] = song_id
//                 })
//             }               
//             Tracks.updateOrCreate(playedSongsModel);
//         })
//     }
// }