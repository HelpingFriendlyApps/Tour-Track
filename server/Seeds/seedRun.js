var Seeds = require('./PHISH.IN-seed')
var db = require('../db');

console.log('inside seedRun')



db.select('*').from('shows').limit(1).then(function(x){
  if(x.length === 0){
    Seeds.seedShows();
  }
})
//seed Venues
db.select('*').from('venues').limit(1).then(function(x){
  if(x.length === 0){
    Seeds.seedVenues();
  }
})
//seed tours
db.select('*').from('tours').limit(1).then(function(x){
  if(x.length === 0){
    Seeds.seedTours();
  }
})

//seed songs
db.select('*').from('songs').limit(1).then(function(x){
  if(x.length === 0){
    Seeds.seedSongs();
  }
})

//seed tracks
db('songplayed').count('id').then(function(total) {
    if(parseInt(total[0].count) < 29004){
      Seeds.seedTracks();
    }
})
