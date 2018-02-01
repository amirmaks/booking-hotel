import {API_HOSTNAME, LOAD_ALL_ROOMS} from "../constants";
import {stringify} from 'qs';

export function loadAllRooms(hotel_id, type_id) {

    const params = {
        object_id: hotel_id,
        type_id
    };

    return {
        type: LOAD_ALL_ROOMS,
        callApi: API_HOSTNAME + `hotel_room?${stringify(params)}`
    }
}