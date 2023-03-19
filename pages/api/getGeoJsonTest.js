const { Pool }= require('pg');
const config= require('private/config.json');
const { stringify } = require('querystring');

const pool= new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database,
    port: config.port,
    idleTimeoutMillis: 30000,
    connectiontimeoutMillis: 2000,
    max: 10
});

pool
    .query('SELECT * FROM alexrodhomerun;')
    .then((res) => console.log(res.rows))
    .catch((err) => console.error('Error Executing Query...eat shit', err.stack))






