import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import ScatterPlot from './components/MemberScatterPlot';

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
      memberData_one: null,
      memberData_two: null,
    }
  }


  componentDidMount() {

    this.setState({ memberData_one: this.props.data })
  }

  render() {
    return (
      <div className='flex h-screen w-screen'>

        <div className='flex h-full w-full flex-row'>

          <div className='h-full w-full'>

            {this.state.data ? (
              <ScatterPlot data={this.state.memberData_one} chartTitle="Congress 112 Member DW_Nominate Scores" />
            ) : (
              <p>Loading...</p>
            )}

          </div>

          <div className='h-full w-full'>

          {this.state.data ? (
            <ScatterPlot data={this.state.memberData_two} chartTitle="Congress 118 Member DW_Nominate Scores" />
          ) : (
            <p>Loading...</p>
          )}

          </div>

        </div>

        <div>




        </div>



      </div>
    )
  }
}

export async function getServerSideProps() {
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
    max: 10,
  });

  const results = await pool.query(
    `SELECT congress, bioname, party_code, nominate_dim1, nominate_dim2, nokken_poole_dim1, nokken_poole_dim2 FROM member_ideology where congress = 118;`
  )

  const formatData = results.rows.map((x) => {
    return {
      party: x.party_code,
      name: x.bioname,
      nominate_dim1: x.nominate_dim1,
      nominate_dim2: x.nominate_dim2,
      np_score_dim1: x.nokken_poole_dim1,
      np_score_dim2: x.nokken_poole_dim2,
    };
  });

  return { props: { data: formatData } };
}
