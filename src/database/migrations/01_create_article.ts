import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('articles', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('img').notNullable();
    table.string('text').notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('articles');
}