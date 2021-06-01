import React, {useEffect} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import Inventory from './Inventory/Inventory';
import NoMatch from './NoMatch/NoMatch';
import {connect} from 'react-redux';
import {createMaps} from './store/maps';
import './App.css';

function App({loadAccount}) {
    // При монтировании компонента пытаемся получить данные аккаунта
    useEffect(() => loadAccount(), []);

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/inventory" component={Inventory}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </HashRouter>
    );
}

export default connect(...createMaps('App'))(App);
