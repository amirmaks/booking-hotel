import React from 'react';
import {connect} from 'react-redux';
import {loadAllHotels} from "../../AC/hotels";
import {mapToArr} from "../../helpers";
import {NavLink} from "react-router-dom";
import Loader from "../Loader";
import PropTypes from "prop-types";

class HotelList extends React.Component {

    static propTypes = {
        // from state
        hotels: PropTypes.object.isRequired,
        loadAllHotels: PropTypes.func.isRequired,

        // from props
        routePath: PropTypes.string.isRequired
    };

    componentDidMount() {
        const {hotels, loadAllHotels} = this.props;
        if( !hotels.loaded ) {
            loadAllHotels(15085);
        }
    }

    render() {

        const {routePath, hotels} = this.props;

        if( !hotels.loaded ) {
            return <Loader/>
        }

        const items = mapToArr(hotels.results).map(hotel => (
            <li key={hotel.id}>
                <NavLink to={`${routePath}${hotel.id}`}>
                    {hotel.name}
                </NavLink>
            </li>
        ));

        return (
            <div>
                <h1>Выберите отель:</h1>
                <ul>{items}</ul>
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
})(HotelList);
