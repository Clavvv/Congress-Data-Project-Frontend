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
import query from './api/query'
import axios from 'axios'

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
    super(props)

    this.state = {
      data: null,
      compareData: null,
      display_compare_chart: false,
      compareSearch: 'Enter year or congress',
    }


    const [chartData1, setChart1]= useState(null)
    const [chartData2, setChart2]= useState(null)
    

    this.handleTextInput = this.handleTextInput.bind(this)
    this.resetDefaultText = this.resetDefaultText.bind(this)

  }




  componentDidMount() {

    this.setState({ data: this.props.data })

  }





  handleCompare = async (e) => {

    const formatInput = (inputString) => {

      let sanitizedString = inputString.replace(/'/g, "''")
      let queryString = 'SELECT congress, bioname, party_code, nominate_dim1, nominate_dim2, nokken_poole_dim1, nokken_poole_dim2 FROM member_ideology where congress = $1;'

      return [queryString, [sanitizedString]]

    }


    let formattedInput= formatInput(this.state.compareSearch)
    console.log(formattedInput)
    // let results= await query(formatI)


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
            <input className='place-self-center' type='search' value={this.state.compareSearch} onChange={this.handleTextInput} onClick={this.resetDefaultText} ></input>
          </div>

          <button className='border border-black w-1/2 justify-center place-self-center m-2 rounded-md border-2' onClick={(e) => this.handleCompare(e)}> Compare </button>





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

  let api_response = await query('SELECT congress, bioname, party_code, nominate_dim1, nominate_dim2, nokken_poole_dim1, nokken_poole_dim2 FROM member_ideology where congress = 118;')


  return { props: { data: api_response } }
}
