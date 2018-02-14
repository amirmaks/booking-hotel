import React from 'react';
import {connect} from 'react-redux';
import {loadHotel} from "../../AC/hotels";
import RoomFilter from './Room/Filter';
import Loader from '../Loader';
import {loadAllRooms} from "../../AC/rooms";
import {mapToArr} from "../../helpers";
import {Route, NavLink} from "react-router-dom";
import Booking from "./";
import PropTypes from "prop-types";
import {loadAllRoomsTypes} from "../../AC/roomsTypes";


class BookingRooms extends React.Component {

    static propTypes = {
        // from route
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        // from state
        hotel: PropTypes.object.isRequired,
        rooms: PropTypes.object.isRequired,

        // from props
        loadAllRooms: PropTypes.func.isRequired,
        loadHotel: PropTypes.func.isRequired
    };

    getIndex = () => {
        return 'Выберите номер';
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

    getBookings = ({match}) => {
        const roomId = match.params.roomId;
        return <Booking roomId={roomId} key={roomId}/>;
    };

    handleRoomFilterSubmit = (filterState) => {
        const {hotel, loadAllRooms} = this.props;

        if( hotel.loaded ) {
            loadAllRooms(hotel.id, filterState.type_id);
        }
    };

    render() {

        const {hotel, rooms, match, history} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let roomFilter = null;
        let roomList = null;

        if( hotel.roomsTypesIds && hotel.roomsTypesIds.length > 0 ) {

            roomFilter = <RoomFilter
                types={hotel.roomsTypesIds}
                onSubmit={this.handleRoomFilterSubmit}
                hotelId={hotel.id}
                history={history}
            />;

            if( rooms.loaded && rooms.count > 0 ) {

                const items = mapToArr(rooms.results).map(room => (
                    <li key={room.id}>
                        <NavLink to={`/booking/rooms/${match.params.hotelId}/${room.id}`}>
                            {room.name}
                        </NavLink>
                    </li>
                ));

                roomList = (
                    <div>
                        <ul>{items}</ul>
                        <Route path='/booking/rooms/:hotelId/' render={this.getIndex} exact/>
                        <Route path='/booking/rooms/:hotelId/:roomId' render={this.getBookings} />
                    </div>
                );
            }
        }

        return (
            <div>
                <h1>{hotel.name}</h1>
                <div>
                    {roomFilter || 'Нет типов номеров'}
                </div>
                <div>
                    {roomList || 'Нет номеров'}
                </div>
            </div>
        );
    }

}

export default connect((state, ownProps) => {
    return {
        hotel: state.hotels.results.get(+ownProps.match.params.hotelId) || {},
        rooms: state.rooms
    }
}, {
    loadHotel,
    loadAllRooms,
    loadAllRoomsTypes
})(BookingRooms);
