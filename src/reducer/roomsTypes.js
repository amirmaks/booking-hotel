import {START, SUCCESS, LOAD_ALL_ROOMS_TYPES, EDIT_ROOMS_TYPE,
ADD_ROOMS_TYPE, DELETE_ROOMS_TYPE} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const RoomsTypeRecord = Record({
    id: undefined,
    name: undefined,
    text: undefined
});

const ReducerState = Record({
    count: 0,
    results: new OrderedMap({}),
    loading: false,
    loaded: false
});

export default function (roomsTypesState = new ReducerState(), action) {
    const {type, response, payload} = action;

    switch (type) {
        case LOAD_ALL_ROOMS_TYPES + START:
            return roomsTypesState
                .set('loading', true);

        case LOAD_ALL_ROOMS_TYPES + SUCCESS:
            return roomsTypesState
                .set('count', response.count)
                .mergeIn(['results'], arrToMap(response.results, RoomsTypeRecord))
                .set('loading', false)
                .set('loaded', true);

        case ADD_ROOMS_TYPE + SUCCESS:
            const map = new OrderedMap({});
            return roomsTypesState
                .mergeIn(['results'], map.set(+response.id, new RoomsTypeRecord(response)));

        case EDIT_ROOMS_TYPE + SUCCESS:
            return roomsTypesState
                .setIn(['results', +response.id], new RoomsTypeRecord(response));

        // case DELETE_ROOMS_TYPE + SUCCESS:
        //     return roomsTypesState
        //         .deleteIn(['results', payload.id]);

        default:
            return roomsTypesState;
    }
}
