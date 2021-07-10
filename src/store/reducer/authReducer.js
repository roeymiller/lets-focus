import * as actionTypes from '../actions/actionTypes';

const initialState  = {
    token: null
}

const onSetToken = (state, action) => {
    return {
        ...state,
        token: action.token
    }
}

const checkTokenExistSuccess= (state, action) => {
    return {
        ...state,
        token: action.token
    }
}

const onLogout = (state, action) => {
    return {
        ...state,
        token: null
    }
}

const checkTokenExistFail = (state, action) => {
    return {
        ...state,
        token: null
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TOKEN: return onSetToken(state, action);
        case actionTypes.CHECK_TOKEN_EXISTS_SUCCESS: return checkTokenExistSuccess(state, action);
        case actionTypes.CHECK_TOKEN_EXISTS_FAIL: return checkTokenExistFail(state, action);
        case actionTypes.ON_LOGOUT: return onLogout(state, action);
        default: return state;
    }
}

export default reducer;