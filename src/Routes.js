import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//pages
import Dashboard from './dashboard/Dashboard'
import Project from './projectlist/ProjectList'
import FloorMaps from './floormaps/MapList'
import FloorPlan from './floorplan/FloorPlan'
import Login from './login/Login'
import UserList from './UserList/UserList'
import NotFound from './main/NotFound'
import Thumbnail from './floorplan/thumbnail/Thumbnail';

//test
// import Thumbnail from './floorplan/Thumbnail'


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
                            component={FloorMaps}
                            exact
                            path="/floorplans"
                        />
                        <Route
                            component={FloorPlan}
                            exact
                            path="/floorplans/asbuilt-ground-floor"
                        />
                        <Route
                            component={Project}
                            exact
                            path="/projects"
                        />
                        <Route
                            component={UserList}
                            exact
                            path="/clients"
                        />
                        <Route
                            component={Thumbnail}
                            exact
                            path="/thumbnail"
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