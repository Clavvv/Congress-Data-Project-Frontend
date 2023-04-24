const { Pool } = require('pg')
const config= require('private/config.json')


export default async function query(q, params= []) {

  try {
    const pool = new Pool({
      user: config.user,
      password: config.password,
      host: config.host,
      database: config.database,
      port: config.port,
      idleTimeoutMillis: 30000,
      connectiontimeoutMillis: 2000,
      max: 10,
    })

    const results = await pool.query(q, params)

    function formatName(n) {

      const split_name= n.split(', ')

      var format= split_name.map((name)=> name.charAt(0) + name.slice(1).toLowerCase())

      return `${format[1]} ${format[0]}`

    }

    const formatData = results.rows.map((x) => {
      return {
        party: x.party_code,
        name: formatName(x.bioname),
        nominate_dim1: x.nominate_dim1,
        nominate_dim2: x.nominate_dim2,
        np_score_dim1: x.nokken_poole_dim1,
        np_score_dim2: x.nokken_poole_dim2,
      }
    })


    return formatData

  } catch (err) {
    console.error(err)
  }
}