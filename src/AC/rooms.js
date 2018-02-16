import {API_HOSTNAME, LOAD_ALL_ROOMS, ADD_ROOM,
EDIT_ROOM, DELETE_ROOM, SUCCESS, FAIL} from "../constants";
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

export function addRoom(data) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_room`, {
            method: 'POST',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: ADD_ROOM + SUCCESS,
                    response
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_ROOM + FAIL,
                    error
                })
            });
    }
}

export function editRoom(data, id) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_room/${id}`, {
            method: 'PUT',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: EDIT_ROOM + SUCCESS,
                    response
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_ROOM + FAIL,
                    error
                })
            });
    }
}

export function deleteRoom(id) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_room/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: DELETE_ROOM + SUCCESS,
                    response,
                    payload: {
                        id
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_ROOM + FAIL,
                    error
                })
            });
    }
}
