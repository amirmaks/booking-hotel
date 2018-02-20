import React from 'react';
import PropTypes from 'prop-types';
import {loadAllBookings} from "../../AC/bookings";
import {connect} from "react-redux";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {convertBookingToBigCalendar, mapToArr} from "../../helpers";
import Form from "./Form";
import "moment/locale/ru";
import "./index.css";
import {ADD} from "../../constants";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


class RoomBookings extends React.Component {

    static propTypes = {
        // from props
        roomId: PropTypes.string.isRequired,

        // from state
        bookings: PropTypes.object.isRequired,
        room: PropTypes.object.isRequired,
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
            formIsOpen: false,
            selectedBooking: 0
        });
    };

    editHandler = (booking) => {
        this.setState({
            formIsOpen: true,
            selectedBooking: booking.id
        });
    };

    addHandler = () => {
        this.setState({
            selectedBooking: 0,
            formIsOpen: true
        })
    };

    render() {
        const {room, bookings} = this.props;

        const items = bookings.results.map(booking => {
            return convertBookingToBigCalendar(booking);
        });

        return (
            <div className="Bookings">
                <div className="form-group">
                    <button className="btn btn-default" onClick={this.addHandler}>{ADD}</button>
                </div>
                <BigCalendar
                    popup
                    selectable
                    events={mapToArr(items)}
                    defaultDate={new Date()}
                    onSelectEvent={this.editHandler}
                />
                <div className={ !this.state.formIsOpen ? 'popup-wrapper hide' : 'popup-wrapper' }>
                    <div className="popup-container">
                        <Form
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
