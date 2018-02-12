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
import "./index.css";

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
        selectedBooking: 0,
        formIsOpen: false
    };

    componentDidMount() {
        this.props.loadAllBookings(this.props.roomId);
    };

    formCloseHandler = () => {
        this.setState({
            formIsOpen: false
        });
    }

    editHandler = (booking) => {
        this.setState({
            formIsOpen: true,
            selectedBooking: booking.id
        });
    }

    addHandler = () => {
        this.setState({
            selectedBooking: 0,
        }, () => {
            this.setState({
                formIsOpen: true
            })
        })
    }

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
            <div className="Bookings">
                <h2>Брони. {room.name}</h2>
                <button className="button-add" onClick={this.addHandler}>Добавить</button>
                <BigCalendar
                    popup
                    selectable
                    events={items}
                    defaultDate={new Date()}
                    onSelectEvent={this.editHandler}
                />
                <div className={ !this.state.formIsOpen ? 'form-wrapper hide' : 'form-wrapper' }>
                    <div className="form">
                        <BookingForm
                          model_id={room.id}
                          selectedBookingId={this.state.selectedBooking}
                          formClose={this.formCloseHandler}
                        />
                    </div>
                </div>
            </div>
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
