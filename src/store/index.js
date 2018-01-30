import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import api from '../middlewares/api';
import thunk from 'redux-thunk';

const store = createStore(reducer, {}, applyMiddleware(thunk, api, logger));

window.store = store;

export default store;

