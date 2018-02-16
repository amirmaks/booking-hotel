import React from "react";
import "../../../index.css";
import {connect} from "react-redux";
import {addRoom, editRoom} from "../../../AC/rooms";
import PropTypes from "prop-types";

class HotelRoomsForm extends React.Component {
    static propTypes = {
        // from props
        hotelId: PropTypes.number.isRequired,
        typeId: PropTypes.number.isRequired,

        id: PropTypes.number.isRequired,
        formClose: PropTypes.func.isRequired,

        // from state
        rooms: PropTypes.object.isRequired,
        addRoom: PropTypes.func.isRequired,
        editRoom: PropTypes.func.isRequired
    };

    state = {
        name_ru: '',
        text_ru: '',
        object_id: this.props.hotelId,
        hotel_rooms_type_id: this.props.typeId
    }

    componentWillReceiveProps(props) {
        if( props.id !== 0 ) {
            let entry = props.rooms.results.get(+props.id);
            this.setState({
                name_ru: entry.name,
                text_ru: entry.text || '',
            });
        } else {
            this.setState({
                name_ru: '',
                text_ru: ''
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {id, addRoom, editRoom, formClose} = this.props;
        if( id !== 0 ) {
            editRoom(this.state, id);
        } else {
            addRoom(this.state);
        }
        formClose();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="popup-form">
                <label>
                    Название*:
                    <input name="name_ru"
                           value={this.state.name_ru}
                           onChange={this.handleChange}
                           required
                    />
                </label>
                <label>
                    Описание:
                    <textarea name="text_ru"
                           value={this.state.text_ru}
                           onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value={this.props.id !== 0 ? 'Изменить' : 'Добавить'}/>
                <a href="javascript:void(0)" className="button-close" onClick={this.props.formClose}>X</a>
            </form>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        rooms: state.rooms || {}
    }
}, {
    addRoom,
    editRoom
})(HotelRoomsForm);
