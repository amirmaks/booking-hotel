import {API_HOSTNAME, LOAD_ALL_ROOMS_TYPES, EDIT_ROOMS_TYPE,
SUCCESS, FAIL, ADD_ROOMS_TYPE, DELETE_ROOMS_TYPE} from "../constants";
import {stringify} from 'qs';

export function loadAllRoomsTypes(hotelId) {

    const params = {
        object_id: hotelId,
    };

    return {
        type: LOAD_ALL_ROOMS_TYPES,
        callApi: API_HOSTNAME + `hotel_rooms_type?${stringify(params)}`,
        payload: { hotelId }
    }
}

export function addRoomsType(data) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_rooms_type`, {
            method: 'POST',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: ADD_ROOMS_TYPE + SUCCESS,
                    response,
                    payload: { hotelId: data.object_id }
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_ROOMS_TYPE + FAIL,
                    error
                })
            });
    }
}

export function editRoomsType(data, id) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_rooms_type/${id}`, {
            method: 'PUT',
            body: stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: EDIT_ROOMS_TYPE + SUCCESS,
                    response
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_ROOMS_TYPE + FAIL,
                    error
                })
            });
    }
}

export function deleteRoomsType(id, hotelId) {
    return dispatch => {
        fetch(API_HOSTNAME + `hotel_rooms_type/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: DELETE_ROOMS_TYPE + SUCCESS,
                    response,
                    payload: {
                        id,
                        hotelId
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_ROOMS_TYPE + FAIL,
                    error
                })
            });
    }
}
