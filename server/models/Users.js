var db      = require('../db.js')
var Promise = require('bluebird')

var Users = module.exports = {

    getUsers : function(){
        return db('users').select('*')
        .then(function (data) {
            console.log("All users in user table: ", data)
            return data;
        })
    },

    createUser : function(attrs){
        attrs.created_at = new Date();
        return db('users').insert(attrs).return(attrs);
    },

    update: function (attrs) {
        attrs.updated_at = new Date()
        return db('users').update(attrs).where({ uid: attrs.uid })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },
    
    updateOrCreate : function(attrs){
        var updated = Users.update(attrs)
        return updated ? updated : Users.createUser(attrs);
    }
}