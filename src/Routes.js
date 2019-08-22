import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard'


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
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}
export default Routes;