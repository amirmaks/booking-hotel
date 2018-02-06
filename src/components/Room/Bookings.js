import React from 'react';
import PropTypes from 'prop-types';
import {loadAllBookings} from "../../AC/bookings";
import {connect} from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {convertBookingToBigCalendar} from "../../helpers";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


class RoomBookings extends React.Component {

    static propTypes = {
        // from props
        roomId: PropTypes.string.isRequired,

        // from state
        room: PropTypes.object.isRequired,
        bookings: PropTypes.object.isRequired,
        loadAllBookings: PropTypes.func.isRequired,
    };


    componentDidMount() {
        this.props.loadAllBookings(this.props.roomId);
    };

    render() {
        const {room, bookings} = this.props;

        let events = [];

        if(room.bookingIds) {
            events = room.bookingIds.map(bookingId => {
                let item = bookings.results.get(bookingId);
                return convertBookingToBigCalendar(item);
            });
        }

        return (
            <BigCalendar
                events={events}
                defaultDate={new Date()}
            />
        )
    }
}

export default connect((state, ownProps) => {
    return {
        room: state.rooms.results.get(+ownProps.roomId) || {},
        bookings: state.bookings || {},
    };
}, {
    loadAllBookings
})(RoomBookings);