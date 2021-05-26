import React, {useEffect} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import Inventory from './Inventory/Inventory';
import NoMatch from './NoMatch/NoMatch';
import './App.css';

import {connect} from 'react-redux';
import mapDispatchToPropsFactory from './store/dispatchMaps';

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

let dispatchMap = mapDispatchToPropsFactory('App');
export default connect(null, dispatchMap)(App);
