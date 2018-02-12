import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from "./Home";
import BookingHotels from './Booking/Hotels';
import BookingRooms from './Booking/Rooms';

import Error from "./Error";
import NotFound from './NotFound';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><NavLink to="/">Главная страница</NavLink></li>
                        <li><NavLink to="/booking/hotels">Брони</NavLink></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/booking/hotels" component={BookingHotels} />
                        <Route path="/booking/rooms/:hotelId" component={BookingRooms} />

                        <Route path="/error" component={Error} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;
