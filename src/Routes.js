import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//pages
//admin:
import adminDashboard from './user_admin/dashboard/Dashboard'
import adminProject from './user_admin/projectlist/ProjectList'
import adminFloorMaps from './user_admin/floormaps/MapList'
import adminFloorPlan from './user_admin/floorplan/FloorPlan'
import adminLogin from './user_admin/login/Login'
import adminUserList from './user_admin/UserList/UserList'


//employee:
import employeeDashboard from './user_employee/dashboard/Dashboard'
import employeeProject from './user_employee/projectlist/ProjectList'
import employeeFloorMaps from './user_employee/floormaps/MapList'
import employeeFloorPlan from './user_employee/floorplan/FloorPlan'
import employeeLogin from './user_employee/login/Login'
import employeeUserList from './user_employee/UserList/UserList'

//client:
import clientDashboard from './user_client/dashboard/Dashboard'
import clientProject from './user_client/projectlist/ProjectList'
import clientFloorMaps from './user_client/floormaps/MapList'
import clientFloorPlan from './user_client/floorplan/FloorPlan'
import clientLogin from './user_client/login/Login'
import clientUserList from './user_client/UserList/UserList'

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
                                component={adminLogin}
                                exact
                                path="/admin/login"
                            />
                            <Route
                                component={adminFloorMaps}
                                exact
                                path="/admin/floorplans"
                            />
                            <Route
                                component={adminFloorPlan}
                                exact
                                path="/admin/floorplans/asbuilt-ground-floor"
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
                                component={employeeLogin}
                                exact
                                path="/employee/login"
                            />
                            <Route
                                component={employeeFloorMaps}
                                exact
                                path="/employee/floorplans"
                            />
                            <Route
                                component={employeeFloorPlan}
                                exact
                                path="/employee/floorplans/asbuilt-ground-floor"
                            />
                            <Route
                                component={employeeProject}
                                exact
                                path="/employee/projects"
                            />
                            <Route
                                component={employeeUserList}
                                exact
                                path="/employee/clients"
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
                                component={clientLogin}
                                exact
                                path="/client/login"
                            />
                            <Route
                                component={clientFloorMaps}
                                exact
                                path="/client/floorplans"
                            />
                            <Route
                                component={clientFloorPlan}
                                exact
                                path="/client/floorplans/asbuilt-ground-floor"
                            />
                            <Route
                                component={clientProject}
                                exact
                                path="/client/projects"
                            />
                            <Route
                                component={clientUserList}
                                exact
                                path="/client/clients"
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

        console.log(this.props.value);

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
        } else{
            console.log('error happens');
        }
        return webRoute;
    }
}
export default Routes;