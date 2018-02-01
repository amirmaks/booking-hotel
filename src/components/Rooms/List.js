import React from 'react';
import PropTypes from 'prop-types';
import {mapToArr} from "../../helpers";
import BookingsList from "../Bookings/List";

class RoomsList extends React.Component {

    static propTypes = {
        rooms: PropTypes.object.isRequired
    };

    state = {
        activeRoomId: ''
    };

    changeActiveRoomId = (roomId) => {
        this.setState({
            activeRoomId: roomId
        })
    };

    render() {

        const items = mapToArr(this.props.rooms.results).map(room => (
            <li key={room.id}>
                {room.name}
                <BookingsList
                    room={room}
                    changeActiveRoomId={this.changeActiveRoomId}
                    activeRoomId={this.state.activeRoomId}
                />
            </li>
        ));

        return (
            <ul>{items}</ul>
        );
    }

}

export default RoomsList;