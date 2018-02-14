import React from "react";
import {connect} from "react-redux";
import {loadHotel} from "../../../../AC/hotels";
import {loadAllRoomsTypes, deleteRoomsType} from "../../../../AC/roomsTypes";
import Loader from "../../../Loader";
// import {mapToArr} from "../../../../helpers";
// import {Route, NavLink} from "react-router-dom";
// import Booking from "./";
import PropTypes from "prop-types";
import "./index.css";
import Form from "./Form";

class HotelRoomsTypes extends React.Component {

    static propTypes = {
        // from state
        hotel: PropTypes.object.isRequired,
        roomsTypes: PropTypes.object.isRequired,
        loadHotel: PropTypes.func.isRequired,
        loadAllRoomsTypes: PropTypes.func.isRequired
    };

    state = {
        id: 0
    }

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.loaded ) {
            loadHotel(match.params.hotelId);
        }
    }

    componentWillReceiveProps(props) {
        if(props.hotel.loaded && props.hotel.roomsTypesIds.length === 0) {
            props.loadAllRoomsTypes(props.hotel.id);
        }
    }

    handleEdit = (id) => {
        this.setState({
            id
        });
    }

    handleAdd = () => {
        this.setState({
            id: 0
        });
    }

    handleDelete = (id, hotelId) => {
        this.props.deleteRoomsType(id, hotelId);
    }

    render() {

        const {hotel, roomsTypes} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let content = null;

        if(hotel.roomsTypesIds.length > 0) {
            const list = hotel.roomsTypesIds.map(type => (
                <tr key={type}>
                    <td>{roomsTypes.results.get(+type).name}</td>
                    <td>
                        <button onClick={this.handleEdit.bind(this, type)}>
                            Изменить
                        </button>
                    </td>
                    <td>
                        <button onClick={this.handleDelete.bind(this, type, hotel.id)}>
                            Удалить
                        </button>
                    </td>
                </tr>
            ));

            content = <table border="1"><tbody>{list}</tbody></table>
        }

        return (
            <div className="HotelRoomsTypes">
                <h1>{hotel.name}</h1>
                <button className="addButton" onClick={this.handleAdd}>Добавить</button>
                {content || 'Записей нет'}
                <Form hotelId={hotel.id} id={this.state.id}/>
            </div>
        );
    }

}

export default connect((state, ownProps) => {
    return {
        hotel: state.hotels.results.get(+ownProps.match.params.hotelId) || {},
        roomsTypes: state.roomsTypes || {}
    }
}, {
    loadHotel,
    loadAllRoomsTypes,
    deleteRoomsType
})(HotelRoomsTypes);