import {START, SUCCESS, FAIL} from "../constants";

export default store => next => action => {
    const {callApi, type, ...rest} = action;

    if(!callApi) return next(action);

    next({
        ...rest, type: type + START
    });

    fetch(callApi)
        .then(res => res.json())
        .then(response => next({...rest, type: type + SUCCESS, response}))
        .catch(error => next({...rest, type : type + FAIL, error}))

}