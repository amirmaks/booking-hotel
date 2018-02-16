import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from "./Home";
import HotelList from "./Hotel/List";

import BookingRooms from "./Booking/Rooms";
import HotelRoomsTypesCrud from "./Hotel/Rooms/Types/Crud";

import HotelRoomsTypesList from "./Hotel/Rooms/Types/List";
import HotelRoomsCrud from "./Hotel/Rooms/Crud";

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

                        <Route path="/hotel/rooms/types/hotels" render={this.getHotels.bind(this, '/hotel/rooms/types/crud/')} />
                        <Route path="/hotel/rooms/types/crud/:hotelId" component={HotelRoomsTypesCrud} />

                        <Route path="/hotel/rooms/hotels" render={this.getHotels.bind(this, '/hotel/rooms/types/')} />
                        <Route exact path="/hotel/rooms/types/:hotelId" component={HotelRoomsTypesList} />

                        <Route path="/hotel/rooms/crud/:typeId/:hotelId" component={HotelRoomsCrud} />

                        <Route path="/error" component={Error} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App;
