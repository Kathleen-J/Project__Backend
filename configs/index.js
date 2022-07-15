module.exports = {

    development: {
      server: {
        port: 3001
      },
      database: {
        client: 'postgresql',
        connection: {
          database: 'skillfox',
          user: 'skillfox',
          password: '123',
          host: 'localhost',
          port: '5432'
        },
        migrations: {
          directory: './db/migrations'
        },
        seeds: {
          directory: './db/seeds'
        }
      },
      pool: {
        min: 0,
        max: 10
      }
    },
    
  production: {
    database: {
      client: 'postgresql',
      connection: {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT
      }
    },
    pool: {
      min: Number(process.env.DB_MIN_POOL),
      max: Number(process.env.DB_MAX_POOL)
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  
  };