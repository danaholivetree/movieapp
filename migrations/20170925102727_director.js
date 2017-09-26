
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('director', (table) => {
    table.increments('id')
    table.varchar('name').notNullable()
    table.varchar('nationality')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('director')
};
