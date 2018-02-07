import {API_HOSTNAME, LOAD_ALL_BOOKINGS, ADD_BOOKING, POST, FAIL, SUCCESS, START} from "../constants";
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
        dispatch({
            type: ADD_BOOKING + START
        });

        fetch(API_HOSTNAME + `booking`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
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