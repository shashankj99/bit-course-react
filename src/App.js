import React from 'react';
import SignInPage from "./components/Auth/SignInPage";
import Auth from './hoc/auth';
import HomePage from "./components/HomePage";
import {Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Switch>
            <Route exact path='/login' component={Auth(SignInPage, false)} />
            <Route exact path='/' component={Auth(HomePage, null)} />
        </Switch>
    );
}

export default App;
