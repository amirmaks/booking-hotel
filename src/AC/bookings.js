import {API_HOSTNAME, LOAD_ALL_BOOKINGS, ADD_BOOKING,
    EDIT_BOOKING, FAIL, SUCCESS} from "../constants";
import {stringify} from 'qs';
import 'whatwg-fetch';

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

export function addBooking(data) {
    return dispatch => {
        fetch(API_HOSTNAME + `booking`, {
            method: 'POST',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: ADD_BOOKING + SUCCESS,
                    response,
                    payload: { roomId: data.model_id }
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_BOOKING + FAIL,
                    error
                })
            });
    }
}

export function editBooking(data, bookingId) {
    return dispatch => {
        fetch(API_HOSTNAME + `booking/${bookingId}`, {
            method: 'PUT',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: EDIT_BOOKING + SUCCESS,
                    response
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_BOOKING + FAIL,
                    error
                })
            });
    }
}
