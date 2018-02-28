import React from 'react';
import {connect} from 'react-redux';
import {loadAllHotels} from "../../AC/hotels";
import {mapToArr} from "../../helpers";
import {NavLink} from "react-router-dom";
import Loader from "../Loader";
import PropTypes from "prop-types";
import {MENU} from "../../constants";

class HotelList extends React.Component {

    static propTypes = {
        // from state
        hotels: PropTypes.object.isRequired,
        loadAllHotels: PropTypes.func.isRequired,

        // from props
        hotelLinkPath: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    };

    componentDidMount() {
        const {hotels, loadAllHotels} = this.props;
        if( !hotels.loaded ) {
            loadAllHotels(15085);
        }
    }

    render() {

        const {hotelLinkPath, hotels, label} = this.props;

        if( !hotels.loaded ) {
            return <Loader/>
        }

        const items = mapToArr(hotels.results).map(hotel => {

            let tileBgStyle = {
                backgroundImage: 'url('+ hotel.image +')'
            };

            return <div className="col-md-4" key={hotel.id}>
                <NavLink to={`${hotelLinkPath}${hotel.id}`} className="thumbnail">
                    <div className="tile-container">
                        <div className="tile-bg" style={tileBgStyle}>
                            <div className="tile-caption">
                                {hotel.name}
                            </div>
                        </div>
                    </div>
                </NavLink>

            </div>
        });

        return (
            <div>
                <ol className="breadcrumb">
                    <li><NavLink to="/">{MENU.home.label}</NavLink></li>
                    <li className="active">{label}</li>
                </ol>
                <div className="form-group">
                    <label className="label label-info">Выберите отель</label>
                </div>
                <div className="row">{items}</div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        hotels: state.hotels
    }
}, {
    loadAllHotels
})(HotelList);
