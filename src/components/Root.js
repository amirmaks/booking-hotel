import React, { Component } from 'react';
import store from '../store';
import {Provider} from 'react-redux';
import App from "./App";

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default Root;
