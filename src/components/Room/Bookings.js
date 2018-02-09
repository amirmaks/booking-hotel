import React from 'react';
import PropTypes from 'prop-types';
import {loadAllBookings} from "../../AC/bookings";
import {connect} from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {convertBookingToBigCalendar} from "../../helpers";
import BookingForm from "../Booking/Form";
import "moment/locale/ru";

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

    state = {
        selectedBookingId: 0
    };

    componentDidMount() {
        this.props.loadAllBookings(this.props.roomId);
    };

    render() {
        const {room, bookings} = this.props;

        let items = [];

        if(room.bookingIds) {
            items = room.bookingIds.map(bookingId => {
                let item = bookings.results.get(bookingId);
                return convertBookingToBigCalendar(item);
            });
        }

        return (
            <div>
                <h2>Брони. {room.name}</h2>
                <BigCalendar
                    popup
                    selectable
                    events={items}
                    defaultDate={new Date()}
                    onSelectEvent={this.bookingSelectHandler}
                />
                <BookingForm
                    model_id={room.id}
                    selectedBookingId={this.state.selectedBookingId}
                />
            </div>
        )
    }

    bookingSelectHandler = (booking) => {
        this.setState({
            selectedBookingId: booking.id
        });
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