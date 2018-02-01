import {API_HOSTNAME, LOAD_ALL_BOOKINGS} from "../constants";
import {stringify} from 'qs';

export function loadAllBookings(roomId) {

    const params = {
        model: 'hotel_room',
        model_id: roomId
    };

    return {
        type: LOAD_ALL_BOOKINGS,
        callApi: API_HOSTNAME + `booking?${stringify(params)}`,
        payload: { roomId }
    }
}