import React from "react";
import {connect} from "react-redux";
import {loadHotel} from "../../AC/hotels";
import {loadAllRoomsTypes, deleteRoomsType} from "../../AC/roomsTypes";
import Loader from "../Loader";
import PropTypes from "prop-types";
import Form from "./Form";
import {ADD, RESTORE_IMPOSSIBLE, NO_TYPES, MENU} from "../../constants";
import {NavLink} from "react-router-dom";

class HotelRoomsTypesCrud extends React.Component {

    static propTypes = {
        // from state
        hotel: PropTypes.object.isRequired,
        roomsTypes: PropTypes.object.isRequired,
        loadHotel: PropTypes.func.isRequired,
        loadAllRoomsTypes: PropTypes.func.isRequired
    };

    state = {
        id: 0,
        formIsOpen: false
    };

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.loaded ) {
            loadHotel(match.params.hotelId);
        }
    }

    componentWillReceiveProps(props) {
        if( !props.hotel.roomsTypesIds ) {
            props.loadAllRoomsTypes(props.hotel.id);
        }
    }

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

    deleteHandler = (id, hotelId) => {
        if( ! window.confirm(RESTORE_IMPOSSIBLE) ) return;
        this.props.deleteRoomsType(id, hotelId);
    };

    render() {

        const {hotel, roomsTypes} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let content = null;

        if( hotel.roomsTypesIds &&  hotel.roomsTypesIds.length > 0 ) {
            const list = hotel.roomsTypesIds.map(type => (
                <tr key={type}>
                    <td>{roomsTypes.results.get(+type).name}</td>
                    <td>
                        <button onClick={this.editHandler.bind(this, type)} className="btn btn-default">
                            <i className="glyphicon glyphicon-pencil"/>
                        </button>
                        <button onClick={this.deleteHandler.bind(this, type, hotel.id)} className="btn btn-default">
                            <i className="glyphicon glyphicon-remove"/>
                        </button>
                    </td>
                </tr>
            ));

            content = <table className="table table-striped "><tbody>{list}</tbody></table>
        }

        const noEntriesMsg = <div>{NO_TYPES}</div>;

        return (
            <div>
                <ol className="breadcrumb">
                    <li><NavLink to="/">{MENU.home.label}</NavLink></li>
                    <li><NavLink to="/types">{MENU.types.label}</NavLink></li>
                    <li className="active">{hotel.name}</li>
                </ol>
                <div className="form-group">
                    <button className="btn btn-default" onClick={this.addHandler}>{ADD}</button>
                </div>
                {content || noEntriesMsg}
                <div className={ !this.state.formIsOpen ? 'popup-wrapper hide' : 'popup-wrapper' }>
                    <div className="popup-container">
                        <Form
                            hotelId={hotel.id}
                            id={this.state.id}
                            formClose={this.formCloseHandler}
                        />
                    </div>
                </div>
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
})(HotelRoomsTypesCrud);
