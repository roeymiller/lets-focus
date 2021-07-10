import styled from "styled-components";
import { motion } from "framer-motion";

// export const BoxContainer = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 10px;

// `;

export const BoxContainer = styled.div`
  width: 600px;
  min-height: 200px;
  display: flex;
  margin-top:10px;
  margin-bottom:10px;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 2.7px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 10%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 7em;
`;

export const BackDrop = styled(motion.div)`
  position: absolute;
  width: 140%;
  height: 550px;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -330px;
  left: -150px;
  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:10px;
  margin-bottom: 5px;
`;

export const HeaderText = styled.h2`
  font-weight: 600;
  color: #fff;
  z-index: 10;
  margin: 0;
  font-size: 30px;
  line-height: 1.24;
`;


export const FormContainer = styled.form`
  width: 80%;
  margin-top:10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  background-color: white;
`;

export const MutedLink = styled.a`
  color: rgba(170, 170, 170, 1);
  font-size: 11px;
  font-weight: 500;
  margin: 10px 0;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  color: #5963c3;
  font-weight: 600;
  font-size: 11px;
  text-decoration: none;
  margin: 0 3px;
`;

export const Input = styled.input`
  width: 70%;
  height: 30px;
  outline: none;
  border: 2px solid rgba(200, 200, 200, 0.03);
  padding:0 23px;
  transition: all, 200ms ease-in-out;
  box-sizing: border-box;
  border-bottom: 1.4px solid black;

  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    //box-shadow: 0px 0px 2px rgba(200, 200, 200, 1);
    border-bottom: 2px solid #5963c3;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 10%;
  width: 150%;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 0px 200px 200px 200px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;

  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.03);
  }
`;
