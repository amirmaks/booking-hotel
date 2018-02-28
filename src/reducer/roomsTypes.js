import {
    START, SUCCESS, LOAD_ALL_ROOMS_TYPES, EDIT_ROOMS_TYPE,
    ADD_ROOMS_TYPE, ADD_FILES, MODEL_HOTEL_ROOMS_TYPE, DELETE_FILE
} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const RoomsTypeRecord = Record({
    id: undefined,
    name: undefined,
    text: undefined,
    image: undefined,
    images: []
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

        case ADD_FILES + SUCCESS:
            if( payload.model !== MODEL_HOTEL_ROOMS_TYPE ) return roomsTypesState;

            return roomsTypesState
                .updateIn(
                    ['results', +payload.modelId, 'images'],
                    images => images.concat(response)
                );

        case DELETE_FILE + SUCCESS:
            if( payload.model !== MODEL_HOTEL_ROOMS_TYPE ) return roomsTypesState;

            return roomsTypesState
                .updateIn(
                    ['results', +payload.modelId, 'images'],
                    images => images.filter(image => image.id !== payload.id)
                );

        default:
            return roomsTypesState;
    }
}
