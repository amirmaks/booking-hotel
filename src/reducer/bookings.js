import {
    START, SUCCESS, LOAD_ALL_BOOKINGS,
    ADD_BOOKING, EDIT_BOOKING, DELETE_BOOKING
} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const BookingRecord = Record({
    id: undefined,
    user_name: undefined,
    user_email: undefined,
    user_phone: undefined,
    comment: undefined,
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
    const {type, response, payload} = action;

    switch (type) {
        case LOAD_ALL_BOOKINGS + START:
            return bookingsState
                .set('loading', true);

        case LOAD_ALL_BOOKINGS + SUCCESS:
            return bookingsState
                .set('count', response.count)
                .setIn(['results'], arrToMap(response.results, BookingRecord))
                .set('loading', false)
                .set('loaded', true);

        case ADD_BOOKING + SUCCESS:
            const map = new OrderedMap({});
            return bookingsState
                .mergeIn(['results'], map.set(+response.id, new BookingRecord(response)));

        case EDIT_BOOKING + SUCCESS:
            return bookingsState
                .setIn(['results', +response.id], new BookingRecord(response));


        case DELETE_BOOKING + SUCCESS:
            return bookingsState
                .deleteIn(['results', +payload.id]);

        default:
            return bookingsState;
    }
}
