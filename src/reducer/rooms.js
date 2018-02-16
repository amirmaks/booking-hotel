import {START, SUCCESS, LOAD_ALL_ROOMS, ADD_ROOM,
    EDIT_ROOM, DELETE_ROOM} from "../constants";
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

        case ADD_ROOM + SUCCESS:
            const map = new OrderedMap({});
            return roomsState
                .mergeIn(['results'], map.set(+response.id, new RoomRecord(response)));

        case EDIT_ROOM + SUCCESS:
            return roomsState
                .setIn(['results', +response.id], new RoomRecord(response));

        case DELETE_ROOM + SUCCESS:
            return roomsState
                .deleteIn(['results', +payload.id]);

        default:
            return roomsState;
    }
}
