module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'tourtrack_dev'
		},
        seeds: {
            directory: './server/Seeds'
        }
	},
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        }
    }
}