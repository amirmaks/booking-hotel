// export const API_HOSTNAME = "http://gotravelto.kz/api/v1/";
export const API_HOSTNAME = "http://gotravel.openspace.dev/api/v1/";
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

export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";

export const LOAD_ALL_HOTELS = "LOAD_ALL_HOTELS";
export const LOAD_HOTEL = "LOAD_HOTEL";

export const LOAD_ALL_ROOMS = "LOAD_ALL_ROOMS";
export const ADD_ROOM = "ADD_ROOM";
export const EDIT_ROOM = "EDIT_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";

export const LOAD_ALL_BOOKINGS = "LOAD_ALL_BOOKINGS";
export const ADD_BOOKING = "ADD_BOOKING";
export const EDIT_BOOKING = "EDIT_BOOKING";

export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const LOAD_ALL_ROOMS_TYPES = "LOAD_ALL_ROOMS_TYPES";
export const ADD_ROOMS_TYPE = "ADD_ROOMS_TYPE";
export const EDIT_ROOMS_TYPE = "EDIT_ROOMS_TYPE";
export const DELETE_ROOMS_TYPE = "DELETE_ROOMS_TYPE";


export const NO_ROOMS = "Нет номеров";
export const ADD = "Добавить";
export const EDIT = "Изменить";
export const DELETE = "Удалить";
export const RESTORE_IMPOSSIBLE = "Восстановление будет невозможным";
export const NO_TYPES = "Нет типов номеров";
export const NAME = "Название";
export const DESCRIPTION = "Описание";

export const MENU = {
    home: {
        label: "Главная страница"
    },
    bookings: {
        hotelLinkPath: "/bookings/rooms/",
        label: "Брони"
    },
    types: {
        hotelLinkPath: "/types/crud/",
        label: "Типы номеров"
    },
    rooms: {
        hotelLinkPath: "/rooms/crud/",
        label: "Номера"
    },

};