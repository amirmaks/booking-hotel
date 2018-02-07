import React from "react";
import "./BookingFormAdd.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import {DATE_FORMAT} from "../../../constants";
import {connect} from "react-redux";
import {addBooking} from "../../../AC/bookings";
import PropTypes from "prop-types";

class BookingFormAdd extends React.Component {
    static propTypes = {
        // from props
        roomId: PropTypes.number.isRequired,
        addBooking: PropTypes.func.isRequired
    };

    state = {
        user_name: 'max',
        user_email: 'amirmaks@inbox.ru',
        user_phone: '87751761296',
        comment: 'some comment',
        date_start: moment(),
        date_end: moment()
    };
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

        this.props.addBooking({
            model: 'hotel_room',
            model_id: this.props.roomId,
            user_name: this.state.user_name,
            user_email: this.state.user_email,
            user_phone: this.state.user_phone,
            comment: this.state.comment,
            date_start: this.state.date_start.format(DATE_FORMAT),
            date_end: this.state.date_end.format(DATE_FORMAT),
            notification_disable: 1
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="BookingFormAdd">
                <label>
                    Имя клиента*:
                    <input name="user_name"
                           value={this.state.user_name}
                           onChange={this.handleChange}
                           required
                    />
                </label>
                <label>
                    Почта клиента*:
                    <input name="user_email"
                           value={this.state.user_email}
                           onChange={this.handleChange}
                           type="email"
                           required
                    />
                </label>
                <label>
                    Телефон клиента*:
                    <input name="user_phone"
                           value={this.state.user_phone}
                           onChange={this.handleChange}
                           type="number"
                           required
                    />
                </label>
                <label>
                    Комментарий:
                    <textarea name="comment"
                           value={this.state.comment}
                           onChange={this.handleChange}
                    />
                </label>
                <label>
                    Дата (начало):
                    <DatePicker selected={this.state.date_start}
                        onChange={this.handleChangeDateStart}
                    />
                </label>
                <label>
                    Дата (конец):
                    <DatePicker selected={this.state.date_end}
                                onChange={this.handleChangeDateEnd}
                    />
                </label>
                <input type="submit" value="Добавить"/>
            </form>
        )
    }
}

export default connect(null, {
    addBooking
})(BookingFormAdd);
