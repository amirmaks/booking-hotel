import React from 'react';
import PropTypes from 'prop-types';
import {loadAllBookings} from "../../AC/bookings";
import {connect} from "react-redux";

class BookingsList extends React.Component {
    static propTypes = {
        // from props
        room: PropTypes.object.isRequired,
        changeActiveRoomId: PropTypes.func.isRequired,
        activeRoomId: PropTypes.number.isRequired,

        // from state
        loadAllBookings: PropTypes.func.isRequired,
        bookings: PropTypes.object.isRequired
    };
    handleLoad = () => {
        const {loadAllBookings, changeActiveRoomId, room} = this.props;

        loadAllBookings(room.id);
        changeActiveRoomId(room.id);
    }

    render() {
        const {bookings, room, activeRoomId} = this.props;

        // console.log(activeRoomId);

        let items = [];

        if( room.bookingIds.length > 0 ) {
            items = room.bookingIds.map(booking_id => (
                <li key={booking_id}>{bookings.results.get(booking_id).user_name}</li>
            ));
        }

        return (
            <div>
                <button onClick={this.handleLoad}>Bookings</button>
                <ul>{items}</ul>
            </div>
        )
    }
}

export default connect(state => {
    return {
        bookings: state.bookings || {}
    }
}, {
    loadAllBookings
})(BookingsList);