import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class BookingRoomFilter extends React.Component {

    static propTypes = {
        // from props
        types: PropTypes.array.isRequired,
        hotelId: PropTypes.number.isRequired,
        onSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        pushRoute: PropTypes.string.isRequired,

        // from state
        roomsTypes: PropTypes.object.isRequired
    };

    state = {
        type_id: ''
    };

    componentDidMount() {
        this.props.onSubmit({
            object_id: this.props.hotelId,
            type_id: this.state.type_id
        });
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    };
    handleSubmit = (ev) => {
        ev.preventDefault();
        const {onSubmit, history, hotelId, pushRoute} = this.props;
        onSubmit(this.state);
        history.push(`${pushRoute}${hotelId}`);
    };

    render() {
        const options = this.props.types.map(type => (
            <option value={type} key={type}>
                {this.props.roomsTypes.results.get(+type).name}
            </option>
        ));

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Поиск по типам номеров:
                    <select
                        name="type_id"
                        value={this.state.type_id}
                        onChange={this.handleChange}>
                        <option value="">Все</option>
                        {options}
                    </select>
                </label>
                <input type="submit" value="Поиск"/>
            </form>
        )
    }
}

export default connect(state => {
    return {
        roomsTypes: state.roomsTypes || {}
    }
})(BookingRoomFilter);
