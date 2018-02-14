import {START, SUCCESS, LOAD_ALL_HOTELS, LOAD_HOTEL,
LOAD_ALL_ROOMS_TYPES, ADD_ROOMS_TYPE, DELETE_ROOMS_TYPE} from "../constants";
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from "../helpers";

const HotelRecord = Record({
    id: undefined,
    name: undefined,
    image: undefined,
    roomsTypesIds: [],
    loaded: false
});

const ReducerState = Record({
    results: new OrderedMap({}),
    loading: false,
    loaded: false
});

export default function (hotelsState = new ReducerState(), action) {
    const {type, response, payload} = action;

    switch (type) {
        case LOAD_ALL_HOTELS + START:
            return hotelsState
                .set('loading', true);

        case LOAD_ALL_HOTELS + SUCCESS:
            return hotelsState
                .set('results', arrToMap(response.results, HotelRecord))
                .set('loading', false)
                .set('loaded', true);

        case LOAD_HOTEL + SUCCESS:
            return hotelsState
                .setIn(
                    ['results', +payload.id],
                    new HotelRecord(response.results[0])
                )
                .setIn(
                    ['results', +payload.id, 'loaded'],
                    true
                );

        case LOAD_ALL_ROOMS_TYPES + SUCCESS:
            return hotelsState
                .setIn(
                    ['results', +payload.hotelId, 'roomsTypesIds'],
                    response.results.map(type => type.id)
                );

        case ADD_ROOMS_TYPE + SUCCESS:
            return hotelsState
                .updateIn(
                    ['results', +payload.hotelId, 'roomsTypesIds'],
                    roomsTypesIds => roomsTypesIds.concat(response.id)
                );

        case DELETE_ROOMS_TYPE + SUCCESS:

            return hotelsState
                .updateIn(
                    ['results', +payload.hotelId, 'roomsTypesIds'],
                    roomsTypesIds => {
                        const copy = roomsTypesIds.slice();
                        copy.splice(
                            copy.indexOf(+payload.id),
                            1
                        );
                        return copy;
                    }
                )

        default:
            return hotelsState;
    }
}
