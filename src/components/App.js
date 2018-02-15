import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from "./Home";
import HotelList from "./Hotel/List";

import BookingRooms from "./Booking/Rooms";
import HotelRoomsTypes from "./Hotel/Rooms/Types";
import HotelRooms from "./Hotel/Rooms";

import Error from "./Error";
import NotFound from './NotFound';

import './App.css';

class App extends React.Component {

    getHotels(routePath) {
        return <HotelList routePath={routePath} />
    }

    render() {
        return (
            <HashRouter>
                <div className="App">
                    <ul className="main-menu">
                        <li>
                            <NavLink to="/">Главная страница</NavLink>
                        </li>
                        <li>
                            <NavLink to="/booking/hotels">Брони</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotel/rooms/types/hotels">Типы номеров</NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotel/rooms/hotels">Номера</NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/booking/hotels" render={this.getHotels.bind(this, '/booking/rooms/')} />
                        <Route path="/booking/rooms/:hotelId" component={BookingRooms} />

                        <Route path="/hotel/rooms/types/hotels" render={this.getHotels.bind(this, '/hotel/rooms/types/')} />
                        <Route path="/hotel/rooms/types/:hotelId" component={HotelRoomsTypes} />

                        <Route path="/hotel/rooms/hotels" render={this.getHotels.bind(this, '/hotel/rooms/')} />
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
