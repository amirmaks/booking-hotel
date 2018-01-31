import React from 'react';
import {connect} from 'react-redux';
import {loadHotel} from "../AC/hotels";
import RoomsFilter from './Rooms/Filter';

class Hotel extends React.Component {

    componentDidMount() {
        const {hotel, match, loadHotel} = this.props;

        if( !hotel.singleLoaded ) {
            loadHotel(match.params.id);
        }
    }

    render() {
        const {hotel} = this.props;


        return (
            <div>
                <h1>{hotel.name}</h1>
                <RoomsFilter/>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        hotel: state.hotels.results.get(+ownProps.match.params.id) || {}
    }
}, {
    loadHotel
})(Hotel);