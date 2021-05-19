import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import NoMatch from './NoMatch/NoMatch';
import './App.css';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
