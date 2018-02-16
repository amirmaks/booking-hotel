import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadAllRooms, deleteRoom} from "../../../AC/rooms";
import Loader from "../../Loader";
import {mapToArr} from "../../../helpers";
import {NO_ROOMS, ADD, EDIT, DELETE} from "../../../constants";
import Form from "./Form";

class HotelRoomsCrud extends React.Component {

    static propTypes = {
        // from state
        rooms: PropTypes.object.isRequired,
        loadAllRooms: PropTypes.func.isRequired
    }

    state = {
        id: 0,
        formIsOpen: false
    }

    componentDidMount() {
        const {match: {params}, loadAllRooms} = this.props;
        loadAllRooms(params.hotelId, params.typeId);
    }

    formCloseHandler = () => {
        this.setState({
            formIsOpen: false
        });
    }

    editHandler = (id) => {
        this.setState({
            id,
            formIsOpen: true
        });
    }

    addHandler = () => {
        this.setState({
            id: 0,
            formIsOpen: true
        });
    }

    deleteHandler = (id) => {
        if( ! window.confirm('Восстановление не будет возможным') ) return;
        this.setState({
            id: 0
        });
        this.props.deleteRoom(id);
    }


    render() {
        const {rooms, match: {params}} = this.props;

        if( !rooms.loaded ) {
            return <Loader />
        }

        const items = mapToArr(rooms.results).map(room => (
            <tr key={room.id}>
                <td>{room.name}</td>
                <td>
                    <button onClick={this.editHandler.bind(this, room.id)}>
                        {EDIT}
                    </button>
                </td>
                <td>
                    <button onClick={this.deleteHandler.bind(this, room.id)}>
                        {DELETE}
                    </button>
                </td>
            </tr>
        ))

        let content = null;

        if(items.length > 0) {
            content = <table border="1"><tbody>{items}</tbody></table>
        }

        const noEntriesMsg = (
            <div>{NO_ROOMS}</div>
        )

        return (
            <div className="HotelRoomsTypesCrud">
                <button className="addButton" onClick={this.addHandler}>{ADD}</button>
                {content || noEntriesMsg}
                <div className={ !this.state.formIsOpen ? 'popup-wrapper hide' : 'popup-wrapper' }>
                    <div className="popup-container">
                        <Form
                            hotelId={+params.hotelId}
                            typeId={+params.typeId}
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
