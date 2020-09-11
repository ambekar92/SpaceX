import React from 'react'   
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Button} from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import {Link} from "react-router-dom";

import Spacex from './Spacex/Spacex';

import HeaderSideNav from './Layout/HeaderSideNav';


function RouterNav() {
    return(
            <Router>
                <Switch>
                   
                    <Route path="/home">
                    <HeaderSideNav/>                    
                    <Spacex/>
                    </Route>

                    <Route exact path="/">
                    <center>
                    <h1>SpaceX Launch Program</h1>
                    <Button variant="contained" color="primary" component={Link} to="/home">
                        <BeenhereIcon/> Click Here 
                    </Button>
                    </center>
                    </Route>

                </Switch>
        </Router>
    );
}


export default RouterNav;