import React from "react";
import "../../index.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import {ADD, DATE_FORMAT, DELETE, EDIT, RESTORE_IMPOSSIBLE} from "../../constants";
import {connect} from "react-redux";
import {addBooking, editBooking, deleteBooking} from "../../AC/bookings";
import PropTypes from "prop-types";

class BookingForm extends React.Component {
    static propTypes = {
        // from props
        model_id: PropTypes.number.isRequired,
        selectedBookingId: PropTypes.number.isRequired,
        formClose: PropTypes.func.isRequired,

        // from state
        bookings: PropTypes.object.isRequired,
        addBooking: PropTypes.func.isRequired,
        editBooking: PropTypes.func.isRequired,
        deleteBooking: PropTypes.func.isRequired,
    };

    state = {
        user_name: '',
        user_email: '',
        user_phone: '',
        comment: '',
        date_start: moment(),
        date_end: moment()
    };

    componentWillReceiveProps(props) {
        const selectedBookingId = props.selectedBookingId;

        if(selectedBookingId !== 0) {
            const booking = props.bookings.results
                .get(props.selectedBookingId);

            this.setState({
                user_name: booking.user_name,
                user_email: booking.user_email,
                user_phone: booking.user_phone,
                comment: booking.comment || '',
                date_start: moment(booking.date_start * 1000),
                date_end: moment(booking.date_end * 1000),
            });
        } else {
            this.setState({
                user_name: '',
                user_email: '',
                user_phone: '',
                comment: '',
                date_start: moment(),
                date_end: moment(),
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleChangeDateStart = (date) => {
        this.setState({
            date_start: date
        })
    };

    handleChangeDateEnd = (date) => {
        this.setState({
            date_end: date
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            model: 'hotel_room',
            model_id: this.props.model_id,
            user_name: this.state.user_name,
            user_email: this.state.user_email,
            user_phone: this.state.user_phone,
            comment: this.state.comment,
            date_start: this.state.date_start.format(DATE_FORMAT),
            date_end: this.state.date_end.format(DATE_FORMAT),
            notification_disable: 1
        };

        const {selectedBookingId, editBooking, addBooking, formClose} = this.props;
        if(selectedBookingId !== 0) {
            editBooking(data, selectedBookingId);
        } else {
            addBooking(data);
        }
        formClose();
    };

    handleDelete = () => {
        const {selectedBookingId, deleteBooking, formClose} = this.props;

        if( selectedBookingId === 0 ) return;
        if( !window.confirm(RESTORE_IMPOSSIBLE)) return;

        deleteBooking(selectedBookingId);
        formClose();
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit} className="popup-form">
                <div className="form-group">
                    <label>
                        Имя клиента*:
                        <input name="user_name"
                               value={this.state.user_name}
                               onChange={this.handleChange}
                               required
                               className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Почта клиента*:
                        <input name="user_email"
                               value={this.state.user_email}
                               onChange={this.handleChange}
                               type="email"
                               required
                               className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Телефон клиента*:
                        <input name="user_phone"
                               value={this.state.user_phone}
                               onChange={this.handleChange}
                               type="number"
                               required
                               className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Комментарий:
                        <textarea name="comment"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Дата (начало):
                        <DatePicker selected={this.state.date_start}
                            onChange={this.handleChangeDateStart}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Дата (конец):
                        <DatePicker selected={this.state.date_end}
                                    onChange={this.handleChangeDateEnd}
                        />
                    </label>
                </div>

                <div className="pull-left">
                    <input type="submit" value={this.props.selectedBookingId !== 0 ? EDIT : ADD} className="btn btn-primary"/>
                </div>

                <div className="pull-right">
                    {
                        this.props.selectedBookingId !== 0
                        &&
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>{DELETE}</button>
                    }
                </div>

                <div className="clearfix" />

                <i className="button-close glyphicon glyphicon-remove" onClick={this.props.formClose} />
            </form>
        )
    }
}

export default connect(state => {
    return {
        bookings: state.bookings
    }
}, {
    addBooking,
    editBooking,
    deleteBooking
})(BookingForm);
