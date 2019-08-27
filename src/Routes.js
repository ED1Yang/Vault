import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//pages
import Dashboard from './dashboard/Dashboard'
import FloorPlan from './floorplan/FloorPlan'
import Login from './login/Login'
import UserList from './UserList/UserList'
import NotFound from './dashboard/NotFound'


const Routes = () => {
    return (
        <BrowserRouter>
            <div>
                <main>
                    <Switch>
                        <Redirect
                            exact
                            from="/"
                            to="/dashboard"
                        />
                        <Route
                            component={Dashboard}
                            exact
                            path="/dashboard"
                        />
                        <Route
                            component={Login}
                            exact
                            path="/login"
                        />
                        <Route
                            component={FloorPlan}
                            exact
                            path="/floorplan"
                        />
                        <Route
                            component={UserList}
                            exact
                            path="/clients"
                        />
                        <Route
                            component={NotFound}
                            exact
                            path="/notfound"
                        />
                        <Redirect to="/notfound" />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}
export default Routes;