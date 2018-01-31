import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';
import Hotels from './Hotels';
import Error from "./Error";
import Home from "./Home";
import Hotel from './Hotel';
import NotFound from './NotFound';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><NavLink to="/">Home page</NavLink></li>
                        <li><NavLink to="/hotels">Hotels</NavLink></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/hotels" component={Hotels} />
                        <Route path="/hotels/:id" component={Hotel} />
                        <Route path="/error" component={Error} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;