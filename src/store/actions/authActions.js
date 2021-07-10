import * as actionTypes from './actionTypes';

export const setToken = (token) => {
    return {
        type: actionTypes.SET_TOKEN, 
        token: token
    }
}

export const checkTokenExistSuccess = (token) => {
    return {
        type: actionTypes.CHECK_TOKEN_EXISTS_SUCCESS,
        token: token
    }
}

export const checkTokenExistFail = () => {
    return {
        type: actionTypes.CHECK_TOKEN_EXISTS_FAIL,
    }
}

export const checkTokenExist = () => {
    const token= localStorage.getItem("token");
    if(token !== null) {
        return {
            type: actionTypes.CHECK_TOKEN_EXISTS_SUCCESS,
            token: token
        }
    }
    else {
        return {
            type: actionTypes.CHECK_TOKEN_EXISTS_FAIL,
        }
    }

    // return dispatch => {
    //     const token= localStorage.getItem("token");
    //     if(token !== null) {
    //         dispatch(checkTokenExistSuccess(token))
    //     } else {
    //         dispatch(checkTokenExistFail());
    //     }
    // }
}

export const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireDate');
    return {
        type: actionTypes.ON_LOGOUT
    }
} 