import React from 'react';
import {HashRouter, Switch, Route, NavLink} from 'react-router-dom';
import BootstrapListGroupItem from "./BootstrapListGroupItem";

import Home from "./Home";
import HotelList from "./Hotel/List";
import BookingsRooms from "./Bookings/Rooms";
import TypesCrud from "./Types/Crud";
import RoomsTypes from "./Rooms/Types";

import Error from "./Error";
import NotFound from './NotFound';

import {MENU} from "../constants";

class App extends React.Component {

    getHotels({match}) {
        const path = match.path.slice(1);
        return <HotelList hotelLinkPath={MENU[path].hotelLinkPath} label={MENU[path].label} />
    }

    render() {
        return (
            <HashRouter>
                <div className="container">
                    <hr/>
                    <div className="col-md-3 col-sm-4">
                        <div className="list-group">
                            <BootstrapListGroupItem activeOnlyWhenExact={true} to="/" label={MENU.home.label}/>
                            <BootstrapListGroupItem to="/bookings" label={MENU.bookings.label}/>
                            <BootstrapListGroupItem to="/types" label={MENU.types.label}/>
                            <BootstrapListGroupItem to="/rooms" label={MENU.rooms.label}/>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-8">
                        <Switch>
                            <Route exact path="/" component={Home} />

                            <Route exact path="/bookings" render={this.getHotels} />
                            <Route path="/bookings/rooms/:hotelId" component={BookingsRooms} />

                            <Route exact path="/types" render={this.getHotels} />
                            <Route path="/types/crud/:hotelId" component={TypesCrud} />

                            <Route exact path="/rooms" render={this.getHotels} />
                            <Route path="/rooms/crud/:hotelId" component={RoomsTypes} />

                            <Route path="/error" component={Error} />
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default App;
