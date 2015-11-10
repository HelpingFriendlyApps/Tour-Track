var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');

var Users = module.exports = {

    getUsers : function(){
        return db('users').select('*')
        .then(function (data) {
            console.log("All users in user table: ", data)
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

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('users').update(attrs).where({ uid: attrs.uid })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    getUserShows : function(id){
        return Users.getUser(id).then(function(x){
            return request({
                method: 'GET',
                uri: 'https://api.phish.net/api.js',
                api: '2.0',
                method: 'pnet.user.uid.get',
                format: 'json',
                username: x.phish_username,
                password: x.phish_password,
                callback: 'pnet3setlist'
            })
        })
    },
    
    updateOrCreate : function(attrs){
        return Users.update(attrs).catch(Users.createUser(attrs));
    }
}