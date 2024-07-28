/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {

    await knex.schema.createTable('todos', (table) => {
        table.increments('id').primary();
        table.string('taskName').notNullable();
        table.string('description').notNullable();
        table.string('priority').notNullable();
        table.date('dueDate').notNullable();
        table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {

    await knex.schema.dropTableIfExists('todos');
  
};
