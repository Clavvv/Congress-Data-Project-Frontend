const { Pool }= require('pg');

const config= require('private/config.json');

const pool= new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database,
    port: config.port,
    idleTimeoutMillis: 30000
});

pool.query('SELECT "STATEFP" FROM cd116', (err, res) => {
    if (err) {
        console.error(err);

    }else {
        console.log(res.rows);
    }
});



