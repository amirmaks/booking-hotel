import {API_HOSTNAME, API_WITHOUT_PARAMS, LOAD_ALL_HOTELS, LOAD_HOTEL} from "../constants";

import {stringify} from 'qs';

export function loadAllHotels(userId) {
    const params = {
        ...API_WITHOUT_PARAMS,
        ...{
            user_id: userId,
            as_json: 1,
            category_id: 19
        }
    };

    return {
        type: LOAD_ALL_HOTELS,
        callApi: API_HOSTNAME + `object?${stringify(params)}`
    }
}

export function loadHotel(id) {
    return {
        type: LOAD_HOTEL,
        callApi: API_HOSTNAME + `object/${id}`,
        payload: { id }
    }
}