import React, { useContext, useState } from "react";
import  { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions';

export function Logout (props) {
    const dispatch = useDispatch();
    dispatch(authActions.onLogout());
    return (
        <Redirect to="/"/>
    );
}

export default Logout; 