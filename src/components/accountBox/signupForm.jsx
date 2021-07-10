import React, { useContext, useState } from "react";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPassCorrect, setIsPassCorrect] = useState(false);

  const submitForm = event => {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    const url = 'http://localhost:3002/api/user/signup';
    axios.post(url, user)
      .then(res => {
        if (res.status === 201) {
          switchToSignin();
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={(event) => { submitForm(event) }}>
        {/* <Input placeholder="Full Name" onChange={(event) => {setName(event.target.value)
        }}/> */}
        <Input placeholder="Email" onChange={(event) => {
          setEmail(event.target.value)
        }} />
        <Input type="password" placeholder="Password" onChange={(event) => {
          setPassword(event.target.value)
        }} />
        <Input type="password" placeholder="Confirm Password" onChange={(event) => {
          setConfirmPassword(event.target.value)
        }} />
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton disabled={isPassCorrect} onClick={(event) => { submitForm(event) }} >Signup</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export default SignupForm;