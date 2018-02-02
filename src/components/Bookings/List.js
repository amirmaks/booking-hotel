import React from 'react';
import PropTypes from 'prop-types';
import {loadAllBookings} from "../../AC/bookings";
import {connect} from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {convertBookingToBigCalendar} from "../../helpers";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


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

            const events = room.bookingIds.map(bookingId => {
                let item = bookings.results.get(bookingId);
                return convertBookingToBigCalendar(item);
            });

            returnContent = <BigCalendar
                events={events}
                defaultDate={new Date()}
            />
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