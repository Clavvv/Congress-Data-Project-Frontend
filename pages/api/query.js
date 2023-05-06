import { Pool } from 'pg'
import config from 'private/config.json' assert { type: 'json'}

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

export default async function handleQuery(req, res) {

  const congressNum= req.query.congress

  let selectNominate;

  if (req.query.variable === 'nominate') {

    selectNominate= true

  } else {

    selectNominate= false

  }


  const query= {
    text: 'SELECT * from member_ideology where congress = CAST($1 AS INTEGER);',
    values: [congressNum],
  }

  const result= await pool.query(query)

  let parsedResults;

  if (selectNominate) {

    parsedResults= result.rows.map((row) => {
      return {
        name: row.bioname,
        party: row.party_code,
        nominate_dim1: row.nominate_dim1,
        nominate_dim2: row.nominate_dim2,

      }

    })

  } else {
    parsedResults= result.rows.map((row)=> {
      return {
        name: row.bioname,
        party: row.part_code,
        nokken_poole_dim1: row.nokken_poole_dim1,
        nokken_poole_dim2: row.nokken_poole_dim2,

      }

    })

  }

  res.status(200).json(parsedResults)
  
}

  /*const formatData = results.rows.map((x) => {
    return {
      party: x.party_code,
      name: formatName(x.bioname),
      nominate_dim1: x.nominate_dim1,
      nominate_dim2: x.nominate_dim2,
      np_score_dim1: x.nokken_poole_dim1,
      np_score_dim2: x.nokken_poole_dim2,
    }
  })*/

