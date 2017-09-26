
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie', (table) => {
    table.increments('id')
    table.varchar('title').notNullable()
    table.integer('year').notNullable()
    table.integer('director_id').references('id').inTable('director').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movie')
};
