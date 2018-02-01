export const API_HOSTNAME = 'http://gotravel.openspace.dev/api/v1/';
export const DATA_LIMIT = 20;
export const API_WITHOUT_PARAMS = {
    without_coordinates :  1,
    without_object_relations :  1,
    without_tours : 1,
    without_qrcodes : 1,
    without_region : 1,
    without_transports : 1,
    without_categories : 1,
    without_event_relations : 1,
    without_user_relations : 1,
    without_roles : 1,
    without_offices : 1,
    without_fields : 1,
    without_add_attrs : 1,
    without_stars : 1,
    without_sender: 1,
    only_cover_image: 1,
    without_hotel_rooms_types: 1
};

export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export const LOAD_ALL_HOTELS = 'LOAD_ALL_HOTELS';
export const LOAD_HOTEL = 'LOAD_HOTEL';

export const LOAD_ALL_ROOMS = 'LOAD_ALL_ROOMS';
export const LOAD_ALL_BOOKINGS = 'LOAD_ALL_BOOKINGS';