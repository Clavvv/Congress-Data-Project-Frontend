import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import ScatterPlot from './components/MemberScatterPlot'
import { Pool } from 'pg'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      compareData: null,
      display_compare_chart: true,
      compareSearch: 'Enter year or congress',
    }

    this.handleTextInput = this.handleTextInput.bind(this)
    this.resetDefaultText = this.resetDefaultText.bind(this)

  }




  componentDidMount() {

    this.setState({ data: this.props.data })
  }

  handleCompare = (e) => {

    

    this.setState({ display_compare_chart: !this.state.display_compare_chart })
    this.setState({compareData: {}})

  }

  handleTextInput(e) {

    e.preventDefault()

    this.setState({ compareSearch: e.target.value })
  }

  resetDefaultText(e) {
    e.preventDefault()
    this.setState({ compareSearch: this.state.compareSearch === 'Enter year or congress' ? '' : this.state.compareSearch })
  }

  render() {
    return (
      <div className='flex h-screen w-screen'>

        <div className='flex h-full w-full flex-row justify-evenly justify-items-center'>

          <div className='h-1/2 w-1/2'>

            {this.state.data ? (
              <ScatterPlot data={this.state.data} chartTitle="Congress 118 Member DW_Nominate Scores" />
            ) : (
              <p>Loading...</p>
            )}

          </div>

          <div className='flex flex-col place-self-center'>

            <div className='border rounded-md border-2 border-black p-1 justify-items-center'>
              <input className='place-self-center font-semibold' type='search' value={this.state.compareSearch} onChange={this.handleTextInput} onClick={this.resetDefaultText} ></input>
            </div>

            <button onClick={(e) => this.handleCompare(e)}> Compare </button>





          </div>



          {/*<div className='h-full w-full'>

          {this.state.data ? (
            <ScatterPlot data={this.state.data} chartTitle="Congress 118 Member DW_Nominate Scores" />
          ) : (
            <p>Loading...</p>
          )}

          </div>*/}

        </div>


      </div>
    )
  }
}

export async function getServerSideProps() {
  const config = require('private/config.json')

  const pool = new Pool({
    user: config.database_configuration.user,
    password: config.database_configuration.password,
    host: config.database_configuration.host,
    database: config.database_configuration.database,
    port: config.database_configuration.port,
    idleTimeoutMillis: 30000,
    connectiontimeoutMillis: 2000,
    max: 10,
  })

  const results = await pool.query(
    'SELECT congress, bioname, party_code, nominate_dim1, nominate_dim2, nokken_poole_dim1, nokken_poole_dim2 FROM member_ideology where congress = 118;'
  )

  const formatData = results.rows.map((x) => {
    return {
      party: x.party_code,
      name: x.bioname,
      nominate_dim1: x.nominate_dim1,
      nominate_dim2: x.nominate_dim2,
      np_score_dim1: x.nokken_poole_dim1,
      np_score_dim2: x.nokken_poole_dim2,
    }
  })

  return { props: { data: formatData } }
}
