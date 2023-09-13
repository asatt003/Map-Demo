/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("markers", function (table) {
        table.increments("id").primary();
        table.integer("marker_id").notNullable();
        table.string("latitude").notNullable();
        table.string("longitude").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("markers");
};
