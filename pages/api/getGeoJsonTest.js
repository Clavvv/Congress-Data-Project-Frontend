
export default function getGeoJsonTest(req, res) {


    const { Pool } = require('pg');
    const config = require('private/config.json');
    const fs = require('fs');

    const pool = new Pool({
        user: config.database_configuration.user,
        password: config.database_configuration.password,
        host: config.database_configuration.host,
        database: config.database_configuration.database,
        port: config.database_configuration.port,
        idleTimeoutMillis: 30000,
        connectiontimeoutMillis: 2000,
        max: 10
    });

    pool
        .query('SELECT * FROM alexrodhomerun;')
        .then((res) => {
            const results = res.rows.map(row => {
                return {
                    "home_runs": row.HR,
                    "year": row.Year
                };
            });
            const json = JSON.stringify(results);
            fs.writeFile('result.json', json, (err) => {
                if (err) {
                    console.error('Error Writing File', err.stack);
                }
                else {
                    console.log('File Saved Successfully');
                }
            });
        })
        .catch((err) => console.error('Error Executing Query...', err.stack));
}



