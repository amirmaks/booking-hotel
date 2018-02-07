import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from "./Home";
import HotelList from './Hotel/List';
import HotelRooms from './Hotel/Rooms';

import Error from "./Error";
import NotFound from './NotFound';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><NavLink to="/">Главная страница</NavLink></li>
                        <li><NavLink to="/hotel/list">Отели</NavLink></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/hotel/list" component={HotelList} />
                        <Route path="/hotel/rooms/:hotelId" component={HotelRooms} />

                        <Route path="/error" component={Error} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;