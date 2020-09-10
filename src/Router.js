import React from 'react'   
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Button} from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import {Link} from "react-router-dom";

import Spacex from './Spacex/Spacex';
import Ontest from './Home/ontest';
import HeaderSideNav from './Layout/HeaderSideNav';


function RouterNav() {
    return(
            <Router>
                <Switch>
                   
                    <Route path="/home">
                    <HeaderSideNav/>
                    
                    <Spacex/>

                    </Route>

                    <Route path="/dashbaord">
                    <HeaderSideNav/>
                    <h1>Dashbaord Page</h1>
                    <Ontest/>
                    </Route>

                    <Route exact path="/">
                    <h1>Login Page</h1>

                    <Button variant="contained" color="primary" component={Link} to="/home">
                        <BeenhereIcon/> Login to Home
                    </Button>

                    </Route>

                </Switch>
        </Router>
    );
}


export default RouterNav;