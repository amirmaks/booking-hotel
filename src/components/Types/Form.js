import React from "react";
import "../../index.css";
import {connect} from "react-redux";
import {addRoomsType, editRoomsType} from "../../AC/roomsTypes";
import PropTypes from "prop-types";
import {ADD, DESCRIPTION, EDIT, NAME} from "../../constants";

class HotelRoomsTypesForm extends React.Component {
    static propTypes = {
        // from props
        hotelId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        formClose: PropTypes.func.isRequired,

        // from state
        roomsTypes: PropTypes.object.isRequired
    };

    state = {
        name_ru: '',
        text_ru: '',
        object_id: this.props.hotelId
    }

    componentWillReceiveProps(props) {
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
        const {id, addRoomsType, editRoomsType, formClose} = this.props;
        if( id !== 0 ) {
            editRoomsType(this.state, id);
        } else {
            addRoomsType(this.state);
        }
        formClose();
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

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
                <div className="form-group">
                    <label>
                        {DESCRIPTION}:
                        <textarea name="text_ru"
                                  value={this.state.text_ru}
                                  onChange={this.handleChange}
                                  className="form-control"
                        />
                    </label>
                </div>
                <input type="submit" value={this.props.id !== 0 ? EDIT : ADD} className="btn btn-primary"/>
                <i className="button-close glyphicon glyphicon-remove" onClick={this.props.formClose} />
            </form>
        )
    }
}

export default connect(state => {
    return {
        roomsTypes: state.roomsTypes || {}
    }
}, {
    addRoomsType,
    editRoomsType
})(HotelRoomsTypesForm);
