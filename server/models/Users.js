var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Songs   = require('./Songs')
var Users   = module.exports = {

    getUsers : function(){
        return db('users').select('*')
        .then(function (data) {
            return data;
        })
    },

    getUser : function(id){
        return db('users').select('*').where({ uid: id })
        .then(function (data) {
            return data[0];
        })
    },

    createUser : function(attrs){
        attrs.created_at = new Date();
        return db('users').insert(attrs).return(attrs);
    },

    // update:
    // Every Knex query returns an array of objects
    // If affectedCount (array of objects) is empty => return an Error
    // If not => return attrs => updateOrCreate will catch attrs and pass it into createUser
    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('users').update(attrs).where({ uid: attrs.uid })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    getUserShows : function(id){
        return Users.getUser(id).then(function(x){
            return request('https://api.phish.net/api.js?api=2.0&method=pnet.user.myshows.get&format=json&apikey=' + process.env.phishAPIKEY + '&username=' + x.phish_username)
        })
    },

    getAllSongs: function (showArray) {
        var promiseArr = [];
        JSON.parse(showArray).forEach(function (show) {
            promiseArr.push(request('http://phish.in/api/v1/shows/' + show.showdate))
        })
    //A-synch technique to run all the api calls and then return them together after all complete
        return Promise.all(promiseArr).then(function (x) {
            var userSongs = {};
            //iterate over every show for the specific user
            x.forEach((show) => {
                var data = JSON.parse(show).data;
                //iterate over every song played during that show
                data.tracks.forEach((songInstance) => {
                    /*if the songs flow into eachother, 
                    break the string into individual song accounts */
                    if (songInstance.title.indexOf('>') !== -1) {
                        for (var song in Songs.breakMultiSongintoSongObject(songInstance.title)) {
                            userSongs[song] ? userSongs[song]++ : userSongs[song] = 1;
                        }
                    //else, count the song instance
                    } else {
                        userSongs[songInstance.title] ? userSongs[songInstance.title]++ : userSongs[songInstance.title] = 1;
                    }
                })
            })
            var tupleArr = [];
            for (var songs in userSongs){
                tupleArr.push([songs, userSongs[songs]]);
            }
                tupleArr.sort(function(a, b) {return b[1] - a[1]});
            return tupleArr;
        })
    },

    updateOrCreate : function(attrs){
        return Users.update(attrs).catch(Users.createUser(attrs));
    }
}