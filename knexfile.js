// Update with your config settings.
const dotenv = require('dotenv').config()
module.exports = {
    development: {
        client: 'sqlite3',
        debug: true,
        connection: {
            filename: './src/data/dev.sqlite3'
        },

        useNullAsDefault: true,
        migrations: { directory: 'src/data/migrations' },
        pool: {
            afterCreate: (conn, done) =>
                conn.run('PRAGMA foreign_keys = ON', done)
        }
    },

    staging: {
        client: 'pg',
        connection: { connectionString: process.env.DATABASE_URL, ssl: true },
        useNullAsDefault: true,
        debug: true,
        pool: {
            min: 2,
            max: 10
        },
        searchPath: ['knex', 'public'],
        migrations: {
            directory: 'src/data/migrations'
        },
        acquireConnectionTimeout: 10000
    },

    production: {
        client: 'pg',
        connection: { connectionString: process.env.DATABASE_URL, ssl: true },
        pool: {
            min: 2,
            max: 10
        },
        searchPath: ['knex', 'public'],
        useNullAsDefault: true,
        migrations: {
            directory: 'src/data/migrations'
        },
        acquireConnectionTimeout: 10000
    }
}
