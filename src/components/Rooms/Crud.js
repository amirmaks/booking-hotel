import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadAllRooms, deleteRoom} from "../../AC/rooms";
import Loader from "../Loader";
import {mapToArr} from "../../helpers";
import {NO_ROOMS, ADD, RESTORE_IMPOSSIBLE, MENU} from "../../constants";
import Form from "./Form";
import {NavLink} from "react-router-dom";

class HotelRoomsCrud extends React.Component {

    static propTypes = {
        // from state
        rooms: PropTypes.object.isRequired,
        loadAllRooms: PropTypes.func.isRequired
    };

    state = {
        id: 0,
        formIsOpen: false
    };
    formCloseHandler = () => {
        this.setState({
            formIsOpen: false
        });
    };
    editHandler = (id) => {
        this.setState({
            id,
            formIsOpen: true
        });
    };
    addHandler = () => {
        this.setState({
            id: 0,
            formIsOpen: true
        });
    };
    deleteHandler = (id) => {
        if( !window.confirm(RESTORE_IMPOSSIBLE) ) return;

        this.setState({
            id: 0
        });

        this.props.deleteRoom(id);
    };

    componentDidMount() {
        const {hotelId, typeId, loadAllRooms} = this.props;
        loadAllRooms(hotelId, typeId);
    }

    render() {
        const {rooms, hotelId, typeId} = this.props;

        if( !rooms.loaded ) {
            return <Loader />
        }

        const items = mapToArr(rooms.results).map(room => (
            <tr key={room.id}>
                <td>{room.name}</td>
                <td>
                    <button onClick={this.editHandler.bind(this, room.id)} className="btn btn-default">
                        <i className="glyphicon glyphicon-pencil" />
                    </button>
                    <button onClick={this.deleteHandler.bind(this, room.id)} className="btn btn-default">
                        <i className="glyphicon glyphicon-remove" />
                    </button>
                </td>
            </tr>
        ));

        let content = null;

        if(items.length > 0) {
            content = <table className="table table-striped"><tbody>{items}</tbody></table>
        }

        const noEntriesMsg = (
            <div>{NO_ROOMS}</div>
        );

        return (
            <div>
                <div className="form-group">
                    <button className="addButton btn btn-default" onClick={this.addHandler}>{ADD}</button>
                </div>
                {content || noEntriesMsg}
                <div className={ !this.state.formIsOpen ? 'popup-wrapper hide' : 'popup-wrapper' }>
                    <div className="popup-container">
                        <Form
                            hotelId={+hotelId}
                            typeId={+typeId}
                            id={this.state.id}
                            formClose={this.formCloseHandler}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        rooms: state.rooms || {}
    }
}, {
    loadAllRooms,
    deleteRoom
})(HotelRoomsCrud);
