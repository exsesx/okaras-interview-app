const connectionString = "postgres://postgres:postgres@localhost:5432/okaras_olya_course";
// const connectionObject = {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'okaras_olya_course'
// };

const pg = require('pg'),
    knex = require('knex')({
        client: 'pg',
        version: '7.3',
        connection: connectionString,
        debug: true
    });

knex.raw('select 1+1 as result').catch(err => {
    console.log(err);
    process.exit(1);
});

module.exports = knex;