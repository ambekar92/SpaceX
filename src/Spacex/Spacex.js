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
          selectedYear:null,
          Gland_success:null,
          Glaunch_success:null
        }
    }  

    getValue = (val) => {      
        console.log(val)

        if(val.number==='Clear'){

          this.setState({
            selectedYear:''
          });

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
                console.log(data)
                this.setState({ setData: data }) 
            })
            .catch(console.log)

        }else{

            this.setState({
                selectedYear: val.number
            });

            fetch(base_url+'limit=100&launch_year='+val.number,{
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


    Launch_Land = (val) => {

    }

    Year_Launch_Land = (val) => {
      
    }


     getButtonsUsingMap = () => {        
        const array = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,'Clear']    
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
        this.getValue({'number':'Clear'});
      }

render() {
    const { classes } = this.props;
    let renderItems=null;
    let Cardval=null;
    let launch_success=null;
    let land_success=null;

      if (this.state.setData.length>0) {
         renderItems = this.state.setData.map(function(item, i) {
           if(item.launch_success){
            launch_success="True"
           }else{
            launch_success="False"
           }

           //console.log(item.rocket.first_stage.cores[0].land_success);

           if(item.rocket.first_stage.cores[0].land_success==null){
            land_success="-"
           }else{
              if(item.rocket.first_stage.cores[0].land_success){
                land_success="True"
                }else{
                land_success="False"
                }
           }


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
                          <li key={i}><span className='itemCss'>{item.mission_id}</span></li><br/>
                        <b>Launch Year: </b><span className='itemCss'>{item.launch_year}</span><br/><br/>
                        <b>Successful Launch: </b><span className='itemCss'>{launch_success}</span><br/><br/>
                        <b>Successful Landing: </b><span className='itemCss'>{land_success}</span><br/>
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
            <h3 className="filterTil">Filters: 
            <span className='yearCss'>{this.state.selectedYear}</span></h3> 
                <h5><u>Launch Year</u></h5>            
                {this.getButtonsUsingMap()}
                <br/><br/>
                <h5><u>Successfull Launch</u></h5>            
                <Button 
                    item xs={6} md={6} 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {this.Launch_Land('T')}}
                    key='True'
                    value='True'> True
                </Button>

                <Button 
                    item xs={6} md={6} 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {this.Launch_Land('F')}}
                    key='False'
                    value='False'> False 
                </Button>
                <br/><br/>
                <h5><u>Successfull Landing</u></h5>    
                <Button 
                    item xs={6} md={6} 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {this.Year_Launch_Land('T')}}
                    key='True'
                    value='True'> True
                </Button>

                <Button 
                    item xs={6} md={6} 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {this.Year_Launch_Land('F')}}
                    key='False'
                    value='False'> False 
                </Button>

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
