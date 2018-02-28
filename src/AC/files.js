import {API_HOSTNAME, ADD_FILES, DELETE_FILE, SUCCESS, FAIL, START} from "../constants";

export function addFiles(files, model, modelId) {
    return dispatch => {

        dispatch({
            type: ADD_FILES + START,
            payload: {
                model
            }
        });

        const formData = new FormData();

        for( let file in files ) {
            if( ! files.hasOwnProperty(file)) continue;
            formData.append('file[]', files[file], files[file].name);
        }

        formData.append('model', model);
        formData.append('model_id', modelId);

        fetch(API_HOSTNAME + `file`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: ADD_FILES + SUCCESS,
                    response,
                    payload: {
                        model,
                        modelId
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_FILES + FAIL,
                    error
                })
            });
    }
}


export function deleteFile(id, model, modelId) {
    return dispatch => {
        fetch(API_HOSTNAME + `file/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: DELETE_FILE + SUCCESS,
                    response,
                    payload: {
                        id,
                        model,
                        modelId
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_FILE + FAIL,
                    error
                })
            });
    }
}
