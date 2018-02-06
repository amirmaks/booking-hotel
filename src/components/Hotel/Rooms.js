import React from 'react';
import {connect} from 'react-redux';
import {loadHotel} from "../../AC/hotels";
import RoomFilter from '../Room/Filter';
import Loader from '../Loader';
import {loadAllRooms} from "../../AC/rooms";
import {mapToArr} from "../../helpers";
import {Route, NavLink} from "react-router-dom";
import RoomBookings from "../Room/Bookings";
import PropTypes from "prop-types";


class HotelRooms extends React.Component {

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
        return 'Please, select a room';
    };
    getBookings = ({match}) => {
        const roomId = match.params.roomId;
        return <RoomBookings roomId={roomId} key={roomId}/>;
    };
    handleRoomFilterSubmit = (filterState) => {
        const {hotel, loadAllRooms} = this.props;

        if( hotel.loaded ) {
            loadAllRooms(hotel.id, filterState.type_id);
        }
    };

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.loaded ) {
            loadHotel(match.params.hotelId);
        }
    }

    render() {

        const {hotel, rooms, match, history} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let roomFilter = null;
        let roomList = null;

        if( hotel.hotel_rooms_types.length > 0 ) {

            roomFilter = <RoomFilter
                types={hotel.hotel_rooms_types}
                onSubmit={this.handleRoomFilterSubmit}
                hotelId={hotel.id}
                history={history}
            />;

            if( rooms.loaded && rooms.count > 0 ) {

                const items = mapToArr(rooms.results).map(room => (
                    <li key={room.id}>
                        <NavLink to={`/hotel/rooms/${match.params.hotelId}/${room.id}`}>
                            {room.name}
                        </NavLink>
                    </li>
                ));

                roomList = (
                    <div>
                        <ul>{items}</ul>
                        <Route path='/hotel/rooms/:hotelId/' render={this.getIndex} exact/>
                        <Route path='/hotel/rooms/:hotelId/:roomId' render={this.getBookings} />
                    </div>
                );
            }
        }

        return (
            <div>
                <h1>{hotel.name}</h1>
                <div>
                    {roomFilter || 'No rooms types'}
                </div>
                <div>
                    {roomList || 'No rooms'}
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
    loadAllRooms
})(HotelRooms);