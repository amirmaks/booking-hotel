import React from "react";
import "../../index.css";
import {connect} from "react-redux";
import {addRoomsType, editRoomsType} from "../../AC/roomsTypes";
import {deleteFile} from "../../AC/files";
import PropTypes from "prop-types";
import {ADD, DESCRIPTION, EDIT, MODEL_HOTEL_ROOMS_TYPE, NAME, RESTORE_IMPOSSIBLE} from "../../constants";
import FileUploader from "../File/Uploader";
import Loader from "../Loader";

class HotelRoomsTypesForm extends React.Component {
    static propTypes = {
        // from props
        hotelId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        formClose: PropTypes.func.isRequired,
        addRoomsType: PropTypes.func.isRequired,
        editRoomsType: PropTypes.func.isRequired,
        deleteFile: PropTypes.func.isRequired,

        // from state
        roomsTypes: PropTypes.object.isRequired
    };

    state = {
        name_ru: '',
        text_ru: '',
        object_id: this.props.hotelId
    };

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

    handleDelete = (id) => {
        if( !window.confirm(RESTORE_IMPOSSIBLE) ) return;
        this.props.deleteFile(id, MODEL_HOTEL_ROOMS_TYPE, this.props.id);
    };

    render() {

        const {roomsTypes, id} = this.props;
        const record = roomsTypes.results.get(+id);

        let fileUploader = <FileUploader model={MODEL_HOTEL_ROOMS_TYPE} modelId={id}/>;
        if(roomsTypes.addingFiles) {
            fileUploader = <Loader/>;
        }

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
                <div className="form-group">
                    <input type="submit" value={id !== 0 ? EDIT : ADD} className="btn btn-primary"/>
                </div>

                {
                    id !== 0 &&
                    <div>
                        <div className="form-group">
                            <label>Загрузка фото:</label>
                            {fileUploader}
                        </div>
                        <div className="form-group">
                            <div className="row">
                                {record.images.map(image => {
                                    let tileBgStyle = {
                                        backgroundImage: 'url('+ image.path +')'
                                    };
                                    return (
                                        <div className="col-sm-4" key={image.id}>
                                            <div className="thumbnail">
                                                <div className="tile-container">
                                                    <div className="tile-bg" style={tileBgStyle}>
                                                        <div className="tile-caption">
                                                            <button onClick={this.handleDelete.bind(this, image.id)}
                                                                    className="btn btn-default" type="button">
                                                                <i className="glyphicon glyphicon-remove"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }

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
    editRoomsType,
    deleteFile
})(HotelRoomsTypesForm);
