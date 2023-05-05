import { Client } from 'pg'
import config from 'private/config.json' assert { type: 'json'}

const client = new Client({
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

  const congressNum= req.query.congrssss
  const displayVariable= req.query.variable

  const query= {
    text: 'SELECT * from member_ideology where congress = $1;',
    values: [congressNum],
  }

  const result= await client.query(query)

  


  res.status(200).json(result.rows)
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

