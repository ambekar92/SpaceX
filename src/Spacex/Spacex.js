import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import './Spacex.css';


const useStyles = theme => ({
  root: {
    flexGrow: 0,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



//const classes = useStyles();
//function Spacex() {
class Spacex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          setData: [],
          selectedYear:null 
        }
    }  

    getValue = (val) => {      
        
        if(val.number===0){

            fetch('https://api.spaceXdata.com/v3/launches?limit=100',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'       
                }
            })
            .then(res => res.json())
            .then((data) => {
            //console.log(data);
            this.setState({ setData: data })           
            })
            .catch(console.log)

        }else{

            this.setState({
                selectedYear: val.number
            });

            fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year='+val.number,{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'       
                }
            })
            .then(res => res.json())
            .then((data) => {
            //console.log(data);
            this.setState({ setData: data })
            
            })
            .catch(console.log)
            
            }

    }

     getButtonsUsingMap = () => {        
        const array = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]    
        return array.map((number) => {
            let btn= <Button 
                        item xs={6} md={6} 
                        variant="contained" 
                        color="primary" 
                        onClick={() => {this.getValue({number})}}
                        key={number}
                        value={number}> {number} 
                    </Button>                    

          return btn
        })
      }

      componentDidMount() {
        this.getValue({'number':0});
      }

render() {
    const { classes } = this.props;
    console.log(this.state);

  return (
    <div className={classes.root}>
        <h1>SpaceX Launch Programs</h1>
      <Grid container spacing={1}>
  
        <Grid item xs={12} sm={3}>           
          <Paper className={classes.paper}>  
            <h2 className="filterTil">Filters</h2>
                <h3><u>Launch Year</u></h3>            
                {this.getButtonsUsingMap()}
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>
                <h2>{this.state.selectedYear}</h2>  
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
}

export default withStyles(useStyles)(Spacex);
