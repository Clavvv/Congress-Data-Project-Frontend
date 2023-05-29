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


  const  formatName = (someName) => {

    let nameArr;
    let lastName;


    nameArr= someName.split(', ')
    lastName= nameArr[0][0]+nameArr[0].slice(1).toLowerCase()
    nameArr.shift()
    nameArr.push(lastName)

    return nameArr.join(' ')



  }


  const congressNum= req.query.congress

  let selectNominate;

  if (req.query.variable === 'nominate') {

    selectNominate= true

  } else {

    selectNominate= false

  }


  const query= {
    text: "SELECT * from member_ideology where congress = CAST($1 AS INTEGER) and chamber = 'House';",
    values: [congressNum],
  }

  const result= await pool.query(query)

  let parsedResults;

  if (selectNominate) {

    parsedResults= result.rows.map((row) => {
      return {
        name: formatName(row.bioname),
        party: row.party_code.toString(),
        variable_dim1: row.nominate_dim1,
        variable_dim2: row.nominate_dim2,

      }


    })

  } else {
    parsedResults= result.rows.map((row)=> {
      return {
        name: formatName(row.bioname),
        party: row.party_code,
        variable_dim1: row.nokken_poole_dim1,
        variable_dim2: row.nokken_poole_dim2,

      }

    })

  }

  res.status(200).json(parsedResults)
  
}