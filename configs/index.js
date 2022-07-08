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
    }
  
  
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'skillfox',
  //     user:     'skillfox',
  //     password: '123'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'main',
  //     user:     'main',
  //     password: '123'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
  
  };