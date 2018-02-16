import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadHotel} from "../../../../AC/hotels.js";
import {loadAllRoomsTypes} from "../../../../AC/roomsTypes.js";
import Loader from "../../../Loader.js";
import {NavLink} from "react-router-dom";

class HotelRoomsTypesList extends React.Component {
    static propTypes = {
        // from state
        hotel: PropTypes.object.isRequired,
        roomsTypes: PropTypes.object.isRequired,
        loadHotel: PropTypes.func.isRequired,
        loadAllRoomsTypes: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.loaded ) {
            loadHotel(match.params.hotelId);
        }
    }

    componentWillReceiveProps(props) {
        if( !props.hotel.roomsTypesIds ) {
            props.loadAllRoomsTypes(props.hotel.id);
        }
    }

    render() {

        const {hotel, roomsTypes} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let content = null;

        if( hotel.roomsTypesIds &&  hotel.roomsTypesIds.length > 0 ) {
            const list = hotel.roomsTypesIds.map(type => (
                <li key={type}>
                    <NavLink to={`/hotel/rooms/crud/${type}/${hotel.id}`}>
                        {roomsTypes.results.get(+type).name}
                    </NavLink>
                </li>
            ));

            content = (
                <div>
                    <div>Выберите тип номера:</div>
                    <ul>{list}</ul>
                </div>
            );
        }

        return (
            <div>
                <h1>{hotel.name}. Типы номеров</h1>
                {content || 'Нет типов номеров'}
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        hotel: state.hotels.results.get(+ownProps.match.params.hotelId) || {},
        roomsTypes: state.roomsTypes || {}
    }
}, {
    loadHotel,
    loadAllRoomsTypes,
})(HotelRoomsTypesList);
