
exports.up = function(knex, Promise) {

    return Promise.all([

        knex.schema.createTable('friends', function(table) {
            table.string('id').primary();
            table.string('user_id').references('uid').inTable('users');
            table.string('friend_id').references('uid').inTable('users');
        })
    ])
};

exports.down = function(knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('friends')
    ])

};
