const pgConnection = process.env.DATABASE_URL

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './src/data/wmp.db3'
        },
        migrations: {
            directory: './src/data/migrations'
        },
        seeds: {
            directory: './src/data/seeds'
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run('PRAGMA foreign_keys = ON', done)
            }
        }
    },

    testing: {
        client: 'sqlite3',
        useNullAsDefault: true,
        migrations: {
            directory: './src/data/migrations'
        },
        seeds: {
            directory: './src/data/seeds'
        },
        connection: {
            filename: './src/data/test.db3'
        }
    },

    production: {
        client: 'pg',
        connection: {
            connectionString: pgConnection,
            ssl: { rejectUnauthorized: false }
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/data/migrations'
        },
        seeds: {
            directory: './src/data/seeds'
        }
    }
}
