import React from 'react';
import {HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import history from '../history';
import Error from "./Error";

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <ul>
                        <li><NavLink to="/">Home page</NavLink></li>
                    </ul>
                    <Switch>
                        <Route path="/error" component={Error} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;