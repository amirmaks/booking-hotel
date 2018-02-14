import {combineReducers} from 'redux';
import hotels from './hotels';
import rooms from './rooms';
import bookings from './bookings';
import roomsTypes from './roomsTypes';

export default combineReducers({
    hotels,
    rooms,
    bookings,
    roomsTypes
});
