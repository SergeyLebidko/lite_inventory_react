import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import './App.css';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="*">
                    <div>Такая страница не найдена...</div>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;
