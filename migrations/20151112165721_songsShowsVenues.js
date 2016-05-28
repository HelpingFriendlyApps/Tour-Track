
exports.up = function(knex, Promise) {
    console.log('running new migration')
    return Promise.all([

        knex.schema.createTable('tours', function(table) {
            table.integer('id').primary();
            table.string('name');
            table.dateTime('starts_on');
            table.dateTime('ends_on');
            table.timestamps();
        }),

        knex.schema.createTable('venues', function(table){
            table.integer('id').primary();
            table.string('name');
            table.string('latitude');
            table.string('longitude');
            table.string('location');
            table.integer('location_id');
            table.timestamps();
        }),

        knex.schema.createTable('shows', function(table){
            table.integer('id').primary();
            table.dateTime('date');
            table.integer('show_number');
            table.integer('duration');
            table.integer('venue_id').references('id').inTable('venues');
            table.integer('tour_id').references('id').inTable('tours');
            table.timestamps();
        }),

        knex.schema.createTable('songs', function(table){
            table.integer('id').primary();
            table.string('title');
            table.timestamps();
        }),

         knex.schema.createTable('songplayed', function(table){
            table.integer('id').primary();
            table.string('set');
            table.integer('position');
            table.integer('duration');
            table.string('mp3');
            table.integer('song_id').references('id').inTable('songs');
            table.integer('show_id').references('id').inTable('shows');
            table.timestamps();
        }),

        knex.schema.createTable('usershows', function(table){
            table.integer('id').primary();
            table.integer('shows_id').references('id').inTable('shows');
            table.string('users_uid').references('uid').inTable('users');
            table.timestamps();
        })
    ])
  
};

exports.down = function(knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('usershows'),
        knex.schema.dropTable('songplayed'),
        knex.schema.dropTable('songs'),
        knex.schema.dropTable('shows'),
        knex.schema.dropTable('venues'),
        knex.schema.dropTable('tours')
    ])
  
};
