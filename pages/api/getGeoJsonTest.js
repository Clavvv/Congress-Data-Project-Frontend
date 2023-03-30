import { resolve } from 'path';

export default function getGeoJsonTest(req, res) {
    const { Pool } = require('pg');
    const config = require('private/config.json');
  
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
      .then((result) => {
        const results = result.rows.map(row => {
          return {
            "home_runs": row.HR,
            "year": row.Year
          };
        });
        const json = JSON.stringify(results);
        res.status(200).json(json)
        resolve();
      })
      .catch((err) => {
        console.error('Error executing query...', err.stack);
        res.status(500).send('Internal Server Error');
        resolve();
      });
  }



