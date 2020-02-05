import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    AppComposition,
    LoginComposition,
    RegisterComposition,
    PrivateComposition,
} from 'compositions';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={AppComposition} />
                    <Route path='/login' exact={true} component={LoginComposition} />
                    <Route path='/register' exact={true} component={RegisterComposition} />
                    <Route path='/private' exact={true} component={PrivateComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;