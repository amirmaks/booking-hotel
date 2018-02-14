import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from "./Home";
import BookingHotels from "./Booking/Hotels";
import BookingRooms from "./Booking/Rooms";
import HotelRoomsTypesHotels from "./Hotel/Rooms/Types/Hotels";
import HotelRoomsTypes from "./Hotel/Rooms/Types";

import Error from "./Error";
import NotFound from './NotFound';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="App">
                    <ul className="main-menu">
                        <li>
                            <NavLink to="/">Главная страница</NavLink>
                        </li>
                        <li>
                            <NavLink to="/booking/hotels">
                                Брони
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/hotel/rooms/types/hotels">
                                Типы номеров
                            </NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/booking/hotels" component={BookingHotels} />
                        <Route path="/booking/rooms/:hotelId" component={BookingRooms} />

                        <Route path="/hotel/rooms/types/hotels" component={HotelRoomsTypesHotels} />
                        <Route path="/hotel/rooms/types/:hotelId" component={HotelRoomsTypes} />

                        <Route path="/error" component={Error} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;
