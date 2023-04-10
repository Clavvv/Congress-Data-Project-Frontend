import { resolve } from 'path';

export default async function getGeoJsonTest(req, res) {
    const { Pool } = require('pg');
    const config = require('private/config.json');
    try {

    const pool = new Pool({
      user: config.database_configuration.user,
      password: config.database_configuration.password,
      host: config.database_configuration.host,
      database: config.database_configuration.database,
      port: config.database_configuration.port,
      idleTimeoutMillis: 30000,
      connectiontimeoutMillis: 2000,
      max: 10
    })

    const { rows }= await pool.query('select p_id, geometry from cd116;')

    const features= rows.map((row) => ({
      type: 'Feature',
      geometry: JSON.parse(row.geometry),
      properties: {
        district_id: row.p_id,
      },

    }))

    const geojson= {
      type: 'FeatureCollection',
      features,
    }

      res.status(200).json(geojson)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Something Went Wrong...'})
    }
  }