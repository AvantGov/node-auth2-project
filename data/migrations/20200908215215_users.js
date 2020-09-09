const { table } = require("../config");

exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
      table.increments("id").notNull()
      table.text("username").notNull()
      table.text("password").notNull()
      table.text("access_level").notNull()
      table.text("department").notNull()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
