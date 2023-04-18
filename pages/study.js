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
import ScatterPlot from './components/ScatterPlot';

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
    };
  }


  componentDidMount() {
    
    this.setState({ data: this.props.data })
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <ScatterPlot data={this.state.data} />
        ) : (
          <p>Loading...</p>
        )}
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
    'SELECT congress, bioname, party_code, nominate_dim1, nominate_dim2, nokken_poole_dim1, nokken_poole_dim2 FROM member_ideology where congress = 112;'
  );

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
