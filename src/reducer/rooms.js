import {START, SUCCESS, LOAD_ALL_ROOMS} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const RoomRecord = Record({
    id: undefined,
    name: undefined,
    text: undefined,
    bookingIds: undefined
});

const ReducerState = Record({
    count: 0,
    results: new OrderedMap({}),
    loading: false,
    loaded: false
});

export default function (roomsState = new ReducerState(), action) {
    const {type, response, payload} = action;

    switch (type) {
        case LOAD_ALL_ROOMS + START:
            return roomsState
                .set('loading', true);

        case LOAD_ALL_ROOMS + SUCCESS:
            return roomsState
                .set('count', response.count)
                .set('results', arrToMap(response.results, RoomRecord))
                .set('loading', false)
                .set('loaded', true);

        default:
            return roomsState;
    }
}
