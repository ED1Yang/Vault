import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//pages
//admin:
import adminDashboard from './user_admin/dashboard/Dashboard'
import adminProject from './user_admin/projectlist/ProjectList'
import adminFloorMaps from './user_admin/floormaps/MapList'
import adminFloorPlan from './user_admin/floorplan/FloorPlan'
import adminUserList from './user_admin/UserList/UserList'


//employee:
import employeeDashboard from './user_employee/dashboard/Dashboard'
import employeeProject from './user_employee/projectlist/ProjectList'
import employeeFloorMaps from './user_employee/floormaps/MapList'
import employeeFloorPlan from './user_employee/floorplan/FloorPlan'

//client:
import clientDashboard from './user_client/dashboard/Dashboard'
import clientProject from './user_client/projectlist/ProjectList'
import clientFloorMaps from './user_client/floormaps/MapList'
import clientFloorPlan from './user_client/floorplan/FloorPlan'

//404
import NotFound from './components/NotFound'

class Routes extends React.Component {



    render() {
        const adminRoute = (
            <BrowserRouter>
                <div>
                    <main>
                        <Switch>
                            <Redirect
                                exact
                                from="/"
                                to="/admin/dashboard"
                            />
                            <Route
                                component={adminDashboard}
                                exact
                                path="/admin/dashboard"
                            />
                            <Route
                                component={adminFloorMaps}
                                exact
                                path="/admin/floorplans"
                            />
                            <Route
                                component={adminFloorPlan}
                                exact
                                path="/admin/floorplans/floorplan"
                            />
                            <Route
                                component={adminProject}
                                exact
                                path="/admin/projects"
                            />
                            <Route
                                component={adminUserList}
                                exact
                                path="/admin/clients"
                            />
                            {/* 404 pager */}
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


        const empRoute = (
            <BrowserRouter>
                <div>
                    <main>
                        <Switch>
                            <Redirect
                                exact
                                from="/"
                                to="/employee/dashboard"
                            />
                            <Route
                                component={employeeDashboard}
                                exact
                                path="/employee/dashboard"
                            />
                            <Route
                                component={employeeFloorMaps}
                                exact
                                path="/employee/floorplans"
                            />
                            <Route
                                component={employeeFloorPlan}
                                exact
                                path="/employee/floorplans/floorplan"
                            />
                            <Route
                                component={employeeProject}
                                exact
                                path="/employee/projects"
                            />

                            {/* 404 pager */}
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


        const clientRoute = (
            <BrowserRouter>
                <div>
                    <main>
                        <Switch>
                            <Redirect
                                exact
                                from="/"
                                to="/client/dashboard"
                            />
                            <Route
                                component={clientDashboard}
                                exact
                                path="/client/dashboard"
                            />
                            <Route
                                component={clientFloorMaps}
                                exact
                                path="/client/floorplans"
                            />
                            <Route
                                component={clientFloorPlan}
                                exact
                                path="/client/floorplans/floorplan"
                            />
                            <Route
                                component={clientProject}
                                exact
                                path="/client/projects"
                            />

                            {/* 404 pager */}
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

        let webRoute = (
            <BrowserRouter>
                <div>
                    <main>
                        <Switch>
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

        if (this.props.value === 'admin') {
            webRoute = adminRoute;
        } else if (this.props.value === 'emp') {
            webRoute = empRoute;
        } else if (this.props.value === 'client') {
            webRoute = clientRoute;
        } else {
            console.log('error happens');
        }
        return webRoute;
    }
}
export default Routes;