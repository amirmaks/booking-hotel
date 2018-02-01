import {START, SUCCESS, LOAD_ALL_BOOKINGS} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const BookingRecord = Record({
    id: undefined,
    user_name: undefined,
    date_start: undefined,
    date_end: undefined,
});

const ReducerState = Record({
    count: 0,
    results: new OrderedMap({}),
    loading: false,
    loaded: false
});

export default function (bookingsState = new ReducerState(), action) {
    const {type, response} = action;

    switch (type) {
        case LOAD_ALL_BOOKINGS + START:
            return bookingsState
                .set('loading', true);

        case LOAD_ALL_BOOKINGS + SUCCESS:
            return bookingsState
                .set('count', response.count)
                .mergeIn(['results'], arrToMap(response.results, BookingRecord))
                .set('loading', false)
                .set('loaded', true);

        default:
            return bookingsState;
    }
}
