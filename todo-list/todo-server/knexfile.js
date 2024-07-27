// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './backend/users.bd3'
    },
    migrations: {
      directory: './backend/migrations'
    },
    seeds: {
      directory: './backend/seeds'
    },
    useNullAsDefault: true,
  }

};
