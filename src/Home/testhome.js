import React,{ Component } from 'react';
import Oeedata from './oeeComponent.js';
import './home.css';

class Home extends Component {  
      state = {
        oeeData: []
      }

      componentDidMount() {
        fetch('http://23.97.51.138/olamapi/workcenter_oee/api/wc_oee.php',{
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
          console.log(data);
          this.setState({ oeeData: data.obj })
           
        })
        .catch(console.log)
      }

    render () {
      return (
        // JSX to render goes here...
        <Oeedata oee={this.state.oeeData} />

      );
    }
  }


export default Home;
