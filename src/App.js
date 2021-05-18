import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import ServiceDescription from './ServiceDescription/ServiceDescription';
import AccountControl from './AccountControl/AccountControl';
import './App.css';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <ServiceDescription/>
                    <AccountControl/>
                </Route>
                <Route path="*">
                    <div>Такая страница не найдена...</div>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;
