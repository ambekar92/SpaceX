import React, { useState } from 'react';   
import {Button} from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/Beenhere';
//import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Configuration from '../configuration';

function log(val) {
  console.log(val)
}

const config = Configuration.BASE_URL;


const Counter = () => {
  alert('Counter')
  const [count, setCount] = useState(0)

  return (
    <div style={{textAlign: "center", marginTop: "8rem"}}>
      <p><h1 style={{fontSize: "5rem"}}>You clicked <span style={{color: "green"}}>{count}</span> times</h1></p>
      <button onClick={() => setCount(count + 1)}>
        <h3> Click me </h3>
      </button>
    </div>
  )
}


class GetOee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false,
      setOeedata: [],
    }
  }

  componentDidMount() {
    alert('componentDidMount');
  }

  async fetchOee() {
    alert('FUNC');  
  
    fetch(config+'workcenter_oee/api/wc_oee.php',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'       
          },
          body: JSON.stringify({
            curr_date: "2019-10-23",
            plant_code: "6190",
            shift_code: "ALL",
            token: "wc_oee"
         })
    })
    .then(res => res.json())
    .then((data) => {    
     this.setState({setOeedata:data.obj});

     this.displayData(data.obj)
    // oeeData= data.obj;
    })
    .catch(console.log)
  }

  displayData = (data) => {
    log('FUN1')
    log(data);
  }

  render() {
     const oeeData = this.state.setOeedata;

     if(oeeData ===''){
      return(
        oeeData && oeeData.map((data, index) =>( 
        <div key={index}>
            <p>{data.material_descp}</p>
        </div>
       )) 
       )
     }

  return (
    <div>
    <Button variant="contained" color="primary" onClick={() => this.fetchOee()}>
      <BeenhereIcon/> Get OEE  </Button>

      
        


<Counter/>
<CircularProgress />
    
    </div>
);
        }

}


export default GetOee;