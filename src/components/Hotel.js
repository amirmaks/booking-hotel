import React from 'react';
import {connect} from 'react-redux';
import {loadHotel} from "../AC/hotels";
import RoomsFilter from './Rooms/Filter';
import Loader from './Loader';
import {loadAllRooms} from "../AC/rooms";
import RoomsList from "./Rooms/List";

class Hotel extends React.Component {

    handleRoomsFilterSubmit = (filterState) => {
        const {hotel, loadAllRooms} = this.props;

        if( hotel.loaded ) {
            loadAllRooms(hotel.id, filterState.type_id)
        }
    };

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.loaded ) {
            loadHotel(match.params.id);
        }
    }

    render() {

        const { hotel, rooms } = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }


        let roomsFilter = null;
        let roomsList = null;

        if( hotel.hotel_rooms_types.length > 0 ) {
            roomsFilter = <RoomsFilter
                types={hotel.hotel_rooms_types}
                onSubmit={this.handleRoomsFilterSubmit}
                hotelId={hotel.id}
            />;

            if( rooms.loaded && rooms.count > 0 ) {
                roomsList = <RoomsList rooms={rooms}/>
            }
        }



        return (
            <div>
                <h1>{hotel.name}</h1>
                <div>
                    {roomsFilter || 'No rooms types'}
                </div>
                <div>
                    {roomsList || 'No rooms'}
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        hotel: state.hotels.results.get(+ownProps.match.params.id) || {},
        rooms: state.rooms
    }
}, {
    loadHotel,
    loadAllRooms
})(Hotel);