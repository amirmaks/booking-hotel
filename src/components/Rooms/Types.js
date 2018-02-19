import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadHotel} from "../../AC/hotels.js";
import {loadAllRoomsTypes} from "../../AC/roomsTypes.js";
import Loader from "../Loader.js";
import {NavLink, Route} from "react-router-dom";
import {MENU} from "../../constants";
import Crud from "./Crud";
import BootstrapNavPill from "../BootstrapNavPill";

class HotelRoomsTypesList extends React.Component {
    static propTypes = {
        // from state
        hotel: PropTypes.object.isRequired,
        roomsTypes: PropTypes.object.isRequired,
        loadHotel: PropTypes.func.isRequired,
        loadAllRoomsTypes: PropTypes.func.isRequired
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

    getIndex = () => {
        return 'Выберите тип'
    };

    getCrud = ({match}) => {
        const {hotelId, typeId} = match.params;
        return <Crud hotelId={hotelId} typeId={typeId} key={typeId} />
    };

    render() {

        const {hotel, roomsTypes} = this.props;

        if( !hotel.loaded ) {
            return <Loader/>
        }

        let content = null;

        if( hotel.roomsTypesIds &&  hotel.roomsTypesIds.length > 0 ) {
            const list = hotel.roomsTypesIds.map(type => (
                <BootstrapNavPill
                    key={type}
                    to={`/rooms/crud/${hotel.id}/${type}`}
                    label={roomsTypes.results.get(+type).name}
                />
            ));

            content = (
                <div>
                    <div className="form-group">
                        <label className="label label-info">Выберите тип номера</label>
                    </div>
                    <div className="form-group">
                        <ul className="nav nav-pills nav-stacked">{list}</ul>
                    </div>

                    <Route path='/rooms/crud/:hotelId/' render={this.getIndex} exact/>
                    <Route path='/rooms/crud/:hotelId/:typeId' render={this.getCrud} />
                </div>
            );
        }

        return (
            <div>
                <ol className="breadcrumb">
                    <li><NavLink to="/">{MENU.home.label}</NavLink></li>
                    <li><NavLink to="/rooms">{MENU.rooms.label}</NavLink></li>
                    <li className="active">{hotel.name}</li>
                </ol>
                {content || 'Нет типов номеров'}
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
})(HotelRoomsTypesList);
