import React, { useContext, useState, useEffect } from "react";
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions';

export function LoginForm(props) {
  const dispatch = useDispatch();
  dispatch(authActions.checkTokenExist());


  const token = useSelector(state => state.authReducer.token)
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   alert("hey");
  //   dispatch(authActions.checkTokenExist());
  // }, []);
  const history = useHistory();


  const submitForm = async (event) => {
    event.preventDefault();
    console.log(event);

    const user = {
      email: email,
      password: password
    }

    console.log(event);


    const url = 'http://localhost:3002/api/user/login';
    axios.post(url, user)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('expireDate', res.data.expiresIn)
          dispatch(authActions.setToken(res.data.token));
          //setRedirect('/meetingList')
          history.push('/')

        }
      })
      .catch(err => {
        setError('Wrong Email Or Password')
        console.log(err)
      })



  }

  return (
    <BoxContainer>
      {/* {token !== null ? <Redirect to="/meetinglist" /> : null}
      {redirect ? <Redirect to={redirect} /> : null} */}
      <FormContainer onSubmit={(event) => { submitForm(event) }}>
        <Input placeholder="Email" onChange={(event) => {
          setEmail(event.target.value)
        }} />
        <Input type="password" placeholder="Password" onChange={(event) => {
          setPassword(event.target.value);
        }} />
      </FormContainer>
      <MutedLink href="#">Forgot Password?</MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={(event) => { submitForm(event) }}>Login</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToSignup}>
          sign up
        </BoldLink>
      </MutedLink>
      {error}
    </BoxContainer>
  );
}

export default LoginForm;