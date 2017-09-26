
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('director').del()
    .then(function () {
      // Inserts seed entries
      return knex('director').insert([
        {id: 1, name: 'director1', nationality: 'german'},
        {id: 2, name: 'director2', nationality: 'swedish'},
        {id: 3, name: 'director3', nationality: 'french'}
      ]);
    });
};
