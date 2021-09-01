import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from '../Pages/Dashboard';
import Navigation from './Navigation/Navs';

function Routes() {
    return (
        <>
            <BrowserRouter>
                <Navigation/>
                <Switch>
                    <Route exact path="/">
                        <Dashboard/>
                    </Route>
                    <Route path="/stats">
                        <Dashboard />
                    </Route>
                    <Route path="/Dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes