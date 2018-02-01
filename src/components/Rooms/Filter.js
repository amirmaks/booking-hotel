import React from 'react';
import PropTypes from 'prop-types';

class RoomsFilter extends React.Component {

    static propTypes = {
        // from props
        types: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired,
        hotelId: PropTypes.number.isRequired
    };

    state = {
        type_id: ''
    };
    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    };
    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.onSubmit(this.state);
    }

    componentDidMount() {
        this.props.onSubmit({
            object_id: this.props.hotelId,
            type_id: this.state.type_id
        });
    }

    render() {

        const options = this.props.types.map(type => (
            <option value={type.id} key={type.id}>{type.name}</option>
        ));

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search by types of rooms:
                    <select
                        name="type_id"
                        value={this.state.type_id}
                        onChange={this.handleChange}
                    >
                        <option value="">---</option>
                        {options}
                    </select>
                </label>
                <input type="submit" value="Search"/>
            </form>
        )
    }
}

export default RoomsFilter;