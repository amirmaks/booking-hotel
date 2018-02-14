import React from "react";
import "../../../../index.css";
import {connect} from "react-redux";
import {addRoomsType, editRoomsType} from "../../../../AC/roomsTypes";
import PropTypes from "prop-types";

class HotelRoomsTypes extends React.Component {
    static propTypes = {
        // from props
        hotelId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,

        // from state
        roomsTypes: PropTypes.object.isRequired
    };

    state = {
        name_ru: '',
        text_ru: '',
        object_id: ''
    }

    componentWillReceiveProps(props) {
        this.setState({
            object_id: props.hotelId
        });

        if( props.id !== 0 ) {
            let entry = props.roomsTypes.results.get(+props.id);
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
        const {id, addRoomsType, editRoomsType} = this.props;
        if( id !== 0 ) {
            editRoomsType(this.state, this.props.id);
        } else {
            addRoomsType(this.state);
        }
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
            </form>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        roomsTypes: state.roomsTypes || {}
    }
}, {
    addRoomsType,
    editRoomsType
})(HotelRoomsTypes);
