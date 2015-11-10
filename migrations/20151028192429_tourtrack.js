
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('users', function(table) {
			table.string('uid').primary();
			table.string('username');
			table.string('password');
			table.string('name');
			table.string('email');
			table.string('profilePic')
			table.string('phish_username');
			table.string('phish_password');
			table.timestamps();
		})
	])
};

exports.down = function(knex, Promise) {

	return Promise.all([
		knex.schema.dropTable('users')
	])

};
