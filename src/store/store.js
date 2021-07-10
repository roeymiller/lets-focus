import {createStore , applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import  * as actionTypes from './actions/actionTypes';
import authReducer from './reducer/authReducer';


const rootReducer= (currentState, action) => {
    return appReducer(currentState, action);
}

const appReducer= combineReducers({
    authReducer: authReducer
});

const store= createStore(rootReducer, combineReducers(applyMiddleware(thunk)));

export const getStore= () => {
    return store;
}