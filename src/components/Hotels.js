import React from 'react';
import {connect} from 'react-redux';
import {loadAllHotels} from "../AC/hotels";
import {mapToArr} from "../helpers";
import {NavLink} from "react-router-dom";

class Hotels extends React.Component {

    componentDidMount() {
        const {hotels, loadAllHotels} = this.props;
        if( !hotels.loaded ) {
            loadAllHotels(15085);
        }
    }

    render() {
        const hotels = mapToArr(this.props.hotels.results).map(hotel => (
            <li key={hotel.id}>
                <NavLink to={`/hotels/${hotel.id}`}>
                    {hotel.name}
                </NavLink>
            </li>
        ));

        return (
            <div>
                <h1>Please, select a hotel</h1>
                <ul>{hotels}</ul>
            </div>
        );
    }
}

export default connect(state => {
    return {
        hotels: state.hotels
    }
}, {
    loadAllHotels
})(Hotels);