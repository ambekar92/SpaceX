import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import './Spacex.css';
import Configuration from '../configuration';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {Row, Col,Image} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const base_url = Configuration.BASE_URL;
const useStyles = theme => ({
  root: {
    flexGrow: 0,
    margin: 10,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardmaxWidth:{
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
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
            // Initial Page
            fetch(base_url+'limit=100',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'       
                }
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({ setData: data }) 
            })
            .catch(console.log)

        }else{

            this.setState({
                selectedYear: val.number
            });

            fetch(base_url+'limit=100&launch_success=true&land_success=true&launch_year='+val.number,{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'       
                }
            })
            .then(res => res.json())
            .then((data) => {
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
    let renderItems=null;
    let Cardval=null;

      if (this.state.setData.length>0) {
         renderItems = this.state.setData.map(function(item, i) {
          Cardval = <Col xs={12} md={3} className="buttonSpace">  
                  <Card className={classes.cardmaxWidth}>
                    <CardActionArea>
                      <Image src={item.links.mission_patch_small} thumbnail />
                      <CardContent>
                        <Typography className="subTitle" gutterBottom variant="h5" component="h2">
                        <b>{item.mission_name} #{item.flight_number}</b>
                        </Typography>
                      <h5 className="bodyCss">
                        <b>Mission IDs:</b>
                          <li key={i}>{item.mission_id}</li><br/>
                        <b>Launch Year:</b>{item.launch_year}<br/>
                        <b>Successful Launch:</b>{item.launch_success}<br/>
                      </h5>  
                      </CardContent>
                    </CardActionArea>         
                  </Card>
                  </Col>

          return Cardval;

        });
      }else{
            renderItems =
            <Col xs={12} md={12} className="buttonSpace"> 
            <center><Typography className="subTitle" gutterBottom variant="h5" component="h2">
              <b> Record Not Found</b>
            </Typography></center>
             </Col>
            
      }

  return (
    <div className={classes.root}>
        <h1 className='Headertitle'>SpaceX Launch Programs</h1> 
        <hr/>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>           
          <Paper className={classes.paper}>  
            <h3 className="filterTil">Filters: <span className='yearCss'>{this.state.selectedYear}</span></h3> 
                <h5><u>Launch Year</u></h5>            
                {this.getButtonsUsingMap()}
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>   
                <Row>          
                  {renderItems}
                </Row>   
                <center><b>Developed By</b>: <span className='developed'>Santhosh</span></center>
          </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
}
}

export default withStyles(useStyles)(Spacex);
