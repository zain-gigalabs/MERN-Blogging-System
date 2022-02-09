import logo from './logo.svg';
import React from "react";
import './App.css';
import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Header from "./components/Header";
import Home from "./components/home/Home";
import {Box} from "@material-ui/core";
import DetailView from "./components/post/DetailView";
import CreateView from "./components/post/CreateView";
import UpdateView from "./components/post/UpdateView";

import Login from './components/account/Login'
import { oktaAuthConfig, oktaSignInConfig } from './config';
import Profile from "./components/home/Profile";

const oktaAuth = new OktaAuth(oktaAuthConfig);

function AppWithRouterAccess() {

    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
        >
            <SecureRoute path='/' component={Header}/>
            <Route path='/login' render={() => <Login config={oktaSignInConfig}/>}/>
            <Route path='/login/callback' component={LoginCallback}/>
            <Box style={{marginTop: 64}}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/details/:id' component={DetailView}/>
                    <Route exact path='/create' component={CreateView}/>
                    <Route exact path='/update/:id' component={UpdateView}/>
                </Switch>
            </Box>

        </Security>
    );
}

export default AppWithRouterAccess;
