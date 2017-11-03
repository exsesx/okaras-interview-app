var knex = require('./connection');

const createDatabase = async function () {
    await knex.schema.createTableIfNotExists('users', function (t) {
        t.increments('user_id');
        t.string('name', 20).defaultTo(null);
        t.string('username', 20).unique().notNullable();
        t.string('password', 30).notNullable();
        t.string('email', 50).unique().notNullable();
        t.string('organization', 50).defaultTo(null);
        t.text('biography').defaultTo(null);
        t.enu('gender', ['male', 'female']);
        t.string('phone', 13).unique().notNullable();
        t.string('country', 60).notNullable();
        t.string('city', 80).notNullable();
    });

    await knex.schema.createTableIfNotExists('projects', function (t) {
        t.increments('project_id');
        t.string('name', 20).notNullable();
        t.text('description').defaultTo(null);
        t.integer('version').notNullable();
        t.enu('status', ['deployed', 'draft', 'archived']);
        t.integer('user_id').references('user_id').inTable('users');
    });

    await knex.schema.createTableIfNotExists('questions', function (t) {
        t.increments('question_id');
        t.string('title', 150).notNullable();
        t.integer('project_id').references('project_id').inTable('projects');
    });

    await knex.schema.createTableIfNotExists('answers', t => {
        t.increments('answer_id');
        t.enu('answer_type', ['select one', 'select many', 'text', 'number']).notNullable();
        t.specificType('options', 'varchar(50)[]').defaultTo(null);
        t.integer('question_id').unique().references('question_id').inTable('questions');
    });

    await knex.schema.createTableIfNotExists('submissions', t => {
        t.increments('submission_id');
        t.string('submission_value', 100).notNullable();
        t.integer('question_id').references('question_id').inTable('questions');
    });

    // t.increments('user_id');
    // t.string('name', 20).defaultTo(null);
    // t.string('username', 20).unique().notNullable();
    // t.string('password', 30).notNullable();
    // t.string('email', 50).unique().notNullable();
    // t.string('organization', 50).defaultTo(null);
    // t.text('biography').defaultTo(null);
    // t.enu('gender', ['male', 'female']);
    // t.string('phone', 13).unique().notNullable();
    // t.string('country', 60).notNullable();
    // t.string('city', 80).notNullable();

    await knex('users').insert({
        name: 'Test Test',
        username: 'test',
        password: 'test1',
        email: 'test1@gmail.com',
        organization: 'Fresh Code IT',
        gender: 'male',
        phone: '0000000000000',
        country: 'Ukraine',
        city: 'Lviv'
    });
};

module.exports = createDatabase;

