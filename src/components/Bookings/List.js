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
        const {loadAllBookings, changeActiveRoomId, room, activeRoomId} = this.props;

        loadAllBookings(room.id);
        changeActiveRoomId(+room.id === +activeRoomId ? 0 : room.id);
    };

    render() {
        const {bookings, room, activeRoomId} = this.props;

        let returnContent;

        if( !room.bookingIds ) {
            returnContent = null
        } else if(room.bookingIds && room.bookingIds.length === 0) {
            returnContent = <div>No bookings</div>
        } else {
            let rows = room.bookingIds.map(booking_id => {
                let item = bookings.results.get(booking_id);

                return <tr key={booking_id}>
                    <td>{item.id}</td>
                    <td>{item.user_name}</td>
                    <td>{item.user_email}</td>
                    <td>{item.user_phone}</td>
                    <td>{item.comment}</td>
                </tr>
            });

            returnContent = <table border="1">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>;
        }

        return (
            <div>
                <button onClick={this.handleLoad}>Bookings</button>
                {+activeRoomId === +room.id && returnContent}
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