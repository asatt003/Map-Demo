exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('markers').del()
      .then( () => {
        // Inserts seed entries
        return knex('markers').insert([{marker_id: 0, latitude: "39.056198", longitude: "-95.695312"}]);
      });
  };