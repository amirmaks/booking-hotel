import React from "react";
import {connect} from "react-redux";
import {addRoom, editRoom} from "../../AC/rooms";
import PropTypes from "prop-types";
import {ADD, DESCRIPTION, EDIT, NAME} from "../../constants";

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
    };

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
                <div className="form-group">
                    <label>
                        {NAME}*:
                        <input name="name_ru"
                               value={this.state.name_ru}
                               onChange={this.handleChange}
                               required
                               className="form-control"
                        />
                    </label>
                </div>
                <label>
                    {DESCRIPTION}:
                    <textarea name="text_ru"
                        value={this.state.text_ru}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                </label>
                <input type="submit" value={this.props.id !== 0 ? EDIT : ADD} className="btn btn-primary"/>
                <i className="button-close glyphicon glyphicon-remove" onClick={this.props.formClose} />
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
